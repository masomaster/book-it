import { Link } from "react-router-dom"

export default function BookListItem({ book }) {
    return (
        <Link to={`/books/${book._id}`} >
            <div className="book-list-item">
                <div><img src={book.img} alt="book cover"/></div>
                <p>{book.title} by {book.authors}</p>
                {typeof(book.percentRead) === "number" ?
                    <p>{book.percentRead}%</p>
                    :
                    <p>{book.percentRead}</p>
                }
            </div>
        </Link>
    )
}