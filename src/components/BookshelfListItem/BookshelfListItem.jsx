import { Link } from "react-router-dom";

export default function BookshelfListItem({ bookshelf}) {
    return (
        <Link to={`/bookshelves/${bookshelf._id}`}>
            <div className="bookshelf-list-item">
                <p>{bookshelf.title}</p>
                <hr />
            </div>
        </Link>
    )
}