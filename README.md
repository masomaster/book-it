# <img src="public/favicon.ico" alt="book" width="25" height="25"/>&nbsp;&nbsp;BookIt!&nbsp;&nbsp;<img src="public/favicon.ico" alt="book"  width="25" height="25"/>

## Helping people finish what they're reading

<a href="https://book-it-reading.herokuapp.com/" target="_blank">BookIt!</a> is a React app to help users track and motivate their reading progress and find their next great read with AI-generated book recommendations. Users can create an account to access full CRUD functionality using RESTful APIs to create books and bookshelves, pin them to prioritize, see their progress and cumulative reading stats, and be motivated to pick up that book! Google Books API provides full book information and beautiful cover images. Users can even get custom, AI-generated recommendations using the Claude API!

<img src="./public/home_shot.png" width="500"/>

## Technologies Used

- <img  src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/html5/html5-plain.svg" alt="HTML5" width="50" height="50"/> &nbsp;
  <img  src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/css3/css3-original.svg" alt="CSS3" width="50" height="50"/> &nbsp;
  <img  src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/javascript/javascript-original.svg" alt="JavaScript" width="50" height="50"/> &nbsp;
  <img  src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/react/react-original.svg" alt="ReactJS" width="50" height="50"/> &nbsp;
  <img  src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/nodejs/nodejs-plain.svg" alt="NodeJS" width="50" height="50"/> &nbsp;
  <img  src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/express/express-original.svg" alt="ExpressJS" width="50" height="50"/> &nbsp;
  <img  src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="50" height="50"/> &nbsp;
- <a href="https://docs.anthropic.com/">Claude API (Anthropic)</a>
- <a href="https://developers.google.com/books/docs/v1/getting_started">Google Books API</a>
- <a href="https://react-select.com/">React-Select</a>
- <a href="https://adminjs.co/">AdminJS</a>
- <a href="https://www.heroku.com/">Heroku</a>

## Getting Started

- <a href="https://trello.com/invite/b/C2hTJevo/ATTI74af5a74f91c5ba0c9a347e6e6802b625EEB015D/book-it-react-app-planning-trello">Trello planning board with user stories</a>
- <a href="https://lucid.app/lucidchart/dba5d055-323a-4141-8949-cfae00733f57/edit?viewport_loc=-127%2C163%2C1579%2C835%2C0_0&invitationId=inv_e52708ba-259e-4e45-a35e-6a85245f5e0f">ERD</a>
- <a href="https://www.figma.com/file/r71XjM02GHD27IGLJlFIcq/home-page?node-id=0%3A1&t=mqSG2wbBnhpJqwVs-1">Wireframes</a>
- <a href="https://book-it-reading.herokuapp.com/" target="_blank">Deployed Version</a> — demo login if available: `demo@demo.com` (password length rules apply only to **new** sign-ups; older accounts may still use shorter passwords).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | MongoDB connection string |
| `SECRET` | JWT signing secret |
| `CLAUDE_API_KEY` / `CLAUDE_MODEL` | Anthropic API for book recommendations |
| `GOOGLE_BOOKS_API_KEY` | Google Books search (server-side) |
| `ENABLE_ADMINJS` | Set to `true` to run the optional AdminJS server (local dev) |
| `ALLOW_ADMINJS_IN_PRODUCTION` | Must be `true` together with `ENABLE_ADMINJS` for AdminJS when `NODE_ENV=production` (avoid on public hosts) |
| `TRUST_PROXY` | Set to `1` behind a reverse proxy (other than Vercel) so rate limits use the real client IP |
| `VERCEL` | Set automatically on Vercel; enables `trust proxy` for rate limiting |

New accounts require a password of **at least 8 characters** (bcrypt cost 12).

## AdminJS (optional admin UI)

AdminJS is a separate small Express app that edits **User**, **Book**, and **Bookshelf** in MongoDB through a browser UI. It only starts when you run **`node server.js`** (or **`npm run server`**) as the main process—not when the app is only loaded as a module (e.g. Vercel’s `api/index.js`).

### How to run it locally

1. Put **`ENABLE_ADMINJS=true`** in `.env` (with a valid **`DATABASE_URL`** so Mongoose can reach your DB).
2. Start the backend: **`node server.js`** (API on **`http://localhost:3001`** by default), or **`npm run server`** if you want a fresh **`npm run build`** first.
3. Open **`http://localhost:8000/admin`** — AdminJS listens on **port 8000** and mounts the UI at **`/admin`**.

You should see a log line like: `AdminJS started on http://localhost:8000/admin`.

### Security notes

- The Admin router is **not** wired to BookIt’s JWT auth; treat it as **trusted-network / local-dev only**.
- If **`NODE_ENV=production`**, AdminJS **will not start** unless you also set **`ALLOW_ADMINJS_IN_PRODUCTION=true`**. Avoid that on any host reachable from the internet unless you fully understand the risk.

## Future Enhancements

- User profile, including profile image, reading speed, etc.
- Amazon, GoodReads, and Zotero API integrations
- Login with Google or Apple
- Add course and due dates for school
- Search and filter through user library
- Refactoring to move more functionality to front end, minimizing fetch calls
- Ability for user to rank books in top ten priority list
- Add reading streak functionality
