import { useState } from "react";
import Select from 'react-select';
import * as booksAPI from '../../utilities/books-api';
import './BookRecs.css';

function isRecPayload(data) {
  return (
    data &&
    typeof data.intro === 'string' &&
    Array.isArray(data.sections)
  );
}

export default function BookRecs({ library }) {
    const [bookChoices, setBookChoices] = useState();
    const [message, setMessage] = useState();
    const [recPayload, setRecPayload] = useState(null);

    const bookOptions = library?.map(b => {return {value: b._id, label: `${b.title} by ${b.authors[0]}`}});

    function handleChoices(choices) {
        if (choices.length) {
            setMessage(null);
            setRecPayload(null);
            setBookChoices(choices);
        }
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        if (bookChoices) {
            try {
                setRecPayload(null);
                setMessage("Oooo great choices! Hm... Let me think about that for a moment...");
                const likedBooks = [...bookChoices];
                const likedBooksString = likedBooks.map(b => b.label).join(', and ');
                const query = `If I liked the book ${likedBooksString} what other books might I like reading?`;
                const recommendations = await booksAPI.getRecs(query);
                setMessage(null);
                if (isRecPayload(recommendations)) {
                    setRecPayload(recommendations);
                } else {
                    setMessage('Unexpected response from the server. Try again.');
                }
            } catch (err) {
                setRecPayload(null);
                setMessage(err.message || 'Something went wrong. Try again.');
            }
        } else {
            setMessage("Select at least one book to get recommendations!");
        }
    }

    return (
        <div className="ai-instructions">
            <p className="alt-instructions-text">Not sure what to read next? Get AI recommendations! Select up to three books you liked:</p><br />
            <form className="ai-form" onSubmit={handleSubmit}>
                <Select
                    name="likedBooks"
                    isMulti
                    options={bookOptions}
                    onChange={handleChoices}
                />
                <input type="submit" className="button-primary" value="Tell Me What to Read!" />
            </form>
            {message && <p className="message book-recs__loading">&nbsp;{message}</p>}
            {recPayload && (
                <div className="book-recs__result">
                    <p className="book-recs__intro">{recPayload.intro}</p>
                    {recPayload.sections.map((section, i) => (
                        <section key={i} className="book-recs__section">
                            <h3 className="book-recs__section-title">{section.heading}</h3>
                            <ul className="book-recs__list">
                                {(section.books || []).map((book, j) => (
                                    <li key={j} className="book-recs__book">
                                        <p className="book-recs__book-title">{book.title}</p>
                                        <p className="book-recs__book-meta">{book.author}</p>
                                        {book.why ? (
                                            <p className="book-recs__book-why">{book.why}</p>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}
