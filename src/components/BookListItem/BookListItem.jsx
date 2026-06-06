import { Link } from "react-router-dom"
import './BookListItem.css';
import { httpsUrl } from '../../utilities/https-url';

export default function BookListItem({ book }) {
    return (
        <Link to={`/books/${book._id}`} >
            <div className="book-list-item">
                <div><img src={httpsUrl(book.img)} alt="book cover"/></div>
                <p>{book.title}</p>
                <p>by {book.authors}</p>
                {typeof(book.percentRead) === "number" ?
                    <p>{book.percentRead}%</p>
                    :
                    <p>{book.percentRead}</p>
                }
            </div>
        </Link>
    )
}