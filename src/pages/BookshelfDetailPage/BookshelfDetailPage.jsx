import { useParams } from "react-router-dom";
import Book from "../../components/Book/Book";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

export default function BookshelfDetailPage({ bookshelves }) {
    const { bookshelfId } = useParams();
    const b = bookshelves.find((b) => b._id === bookshelfId);
    console.log(b)
    return (
        <div className="bookshelf-detail-page">
            <h2>{b.title} Bookshelf</h2>
            <p>Description: {b.description}</p>
            <p>Pinned? {b.pinned ? "Yup!" : "Nope!"}</p>
            <div className="horizontal-book-list">
                {b.books.map(b => (
                    <div>
                        <Book key={b._id} book={b}/>
                        <ProgressBar key={b._id} book={b} done={b.percentRead}/>
                    </div>
                ))}
            </div>
        </div>
    )
}