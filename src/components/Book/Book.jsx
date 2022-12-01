import { Link } from "react-router-dom"
import './Book.css';

export default function Book({ book }) {
    return (
        <Link to={`/books/${book._id}`}>
            <div className="book-list-item">
                <div className="book-cover-img">
                    <img src={book.img} alt="book cover"/>
                </div>
                <p>{book.title}</p>
            </div>
        </Link>
    )
}