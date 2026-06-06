const Anthropic = require('@anthropic-ai/sdk');
const Book = require('../../models/book');
const bookRecsSystemPrompt = require('../prompts/book-recs-system');

/** Anthropic retires old `-latest` IDs; map them so existing .env keeps working. */
const DEPRECATED_CLAUDE_MODELS = {
  'claude-3-5-haiku-latest': 'claude-haiku-4-5',
  'claude-3-5-haiku-20241022': 'claude-haiku-4-5',
};

const rawModel = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';
const CLAUDE_MODEL = DEPRECATED_CLAUDE_MODELS[rawModel] || rawModel;
if (DEPRECATED_CLAUDE_MODELS[rawModel]) {
  console.warn(
    `[getRecs] CLAUDE_MODEL "${rawModel}" is no longer valid; using "${CLAUDE_MODEL}" instead`
  );
}

const claude = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

module.exports = {
  getLibrary,
  addBook,
  getNextUp,
  getInProgressBooks,
  getBooksRead,
  updateBook,
  getRecs,
  deleteBook,
  googleVolumes,
};

async function getLibrary(req, res) {
  const books = await Book.getLibrary(req.user._id)
  res.json(books);
}

async function addBook(req, res) {
  const book = await Book.create({ ...req.body, user: req.user._id });
  res.json(book);
}

async function getNextUp(req, res) {
  const book = await Book.getNextUp(req.user._id)
  res.json(book)
}

async function getInProgressBooks(req, res) {
  const books = await Book.getInProgressBooks(req.user._id)
  res.json(books)
}

async function getBooksRead(req, res) {
  const books = await Book.getBooksRead(req.user._id)
  res.json(books)
}

async function deleteBook(req, res) {
  const deletedBook = await Book.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deletedBook) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const books = await Book.getLibrary(req.user._id);
  res.json(books);
}

async function updateBook(req, res) {
  const newBookInfo = { ...req.body.newBookInfo };
  delete newBookInfo.user;
  const updatedBook = await Book.findOneAndUpdate(
    { _id: req.body.bookId, user: req.user._id },
    newBookInfo,
    { new: true }
  );
  if (!updatedBook) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(updatedBook);
}

function parseRecsPayload(text) {
  let raw = String(text).trim();
  const fenced = raw.match(/^```(?:json)?\s*([\s\S]*?)```$/im);
  if (fenced) raw = fenced[1].trim();

  const data = JSON.parse(raw);
  if (!data || typeof data.intro !== 'string') throw new Error('Missing intro');
  if (!Array.isArray(data.sections) || data.sections.length === 0) {
    throw new Error('Missing sections');
  }
  for (const sec of data.sections) {
    if (typeof sec.heading !== 'string' || !Array.isArray(sec.books)) {
      throw new Error('Invalid section shape');
    }
    for (const b of sec.books) {
      if (!b || typeof b.title !== 'string' || typeof b.author !== 'string') {
        throw new Error('Invalid book shape');
      }
      if (typeof b.why !== 'string') b.why = '';
    }
  }
  return {
    intro: data.intro,
    sections: data.sections,
  };
}

async function getRecs(req, res) {
  const query = req.body?.query;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Missing query for recommendations' });
  }
  try {
    const message = await claude.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      system: bookRecsSystemPrompt,
      messages: [{ role: 'user', content: query }],
    });
    const text = message.content[0].text;
    const payload = parseRecsPayload(text);
    res.json(payload);
  } catch (err) {
    if (err instanceof SyntaxError || err.message.startsWith('Missing') || err.message.startsWith('Invalid')) {
      console.error('getRecs parse error:', err.message);
      return res.status(502).json({ error: 'Model returned unreadable format. Try again.' });
    }
    console.error('Claude API error:', err.message);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
}

/** Google Books search — server adds GOOGLE_BOOKS_API_KEY so quota is yours, not the browser. */
async function googleVolumes(req, res) {
  let q = req.query.q;
  if (Array.isArray(q)) q = q[0];
  if (!q || typeof q !== 'string' || !q.trim()) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  if (!process.env.GOOGLE_BOOKS_API_KEY) {
    return res.status(503).json({
      message:
        'Book search is not configured. Set GOOGLE_BOOKS_API_KEY in the server environment and restart.',
    });
  }

  try {
    const params = new URLSearchParams({
      q: q.trim(),
      maxResults: '20',
      key: process.env.GOOGLE_BOOKS_API_KEY,
    });

    const url = `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;
    const googleRes = await fetch(url);
    let data;
    try {
      data = await googleRes.json();
    } catch (parseErr) {
      console.error('googleVolumes: non-JSON from Google', parseErr);
      return res.status(502).json({
        message: 'Google Books returned an invalid response. Try again later.',
      });
    }

    if (data.error) {
      const msg =
        data.error.message ||
        'Google Books could not run this search.';
      console.error('Google Books API error:', data.error.code, msg);
      return res.status(502).json({
        message: msg,
        code: data.error.code,
      });
    }

    if (!googleRes.ok) {
      console.error('Google Books HTTP', googleRes.status, data);
      return res.status(502).json({
        message: `Google Books returned HTTP ${googleRes.status}.`,
      });
    }

    res.json(data);
  } catch (err) {
    console.error('googleVolumes', err);
    res.status(500).json({ message: 'Book search failed on the server.' });
  }
}
