import { Link } from "react-router-dom";
import Book from "../Book/Book";
import './BookshelfListItem.css';

export default function BookshelfListItem({ bookshelf}) {
    return (
        <div className="bookshelf-list-item">
            <Link to={`/bookshelves/${bookshelf._id}`}>
                <h3>{bookshelf.title}</h3>
            </Link>
            <div className="horizontal-book-list">
                {bookshelf.books.slice(0, 3).map(b => (<Book key={b._id} book={b}/>))}
            </div>
            <hr />
        </div>
    )
}