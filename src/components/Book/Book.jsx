import { Link } from "react-router-dom"

export default function Book({ book }) {
    return (
        <Link to={`/books/${book._id}`}>
            <div className="book-list-item">
                <div>
                    <img src={book.img} alt="book cover"/>
                </div>
                <p>{book.title}</p>
            </div>
        </Link>
    )
}