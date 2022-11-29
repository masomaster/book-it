import { useParams } from "react-router-dom";
import EditDeleteButtons from "../../components/EditDeleteButtons/EditDeleteButtons";
import './BookDetailPage.css';

export default function BookDetailPage({ library }) {
    const { bookId } = useParams();
    const book = library.find((b) => b._id === bookId);
    
    return (
        <div className="book-detail-page">
            <h2>{book.title}</h2>
            <div>
                <img src={book.img} alt="book cover"/>
            </div>
            {book.authors.map(a => <p>{a}</p>)}
            <p>Published: {book.pubYear}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Total Pages: {book.totalPages}</p>
            <p>Pages Read: {book.pagesRead}</p>
            <p>Category: {book.category}</p>
            <p><a href={book.url}>Click here</a> for Google Books page</p>
            <p>Description: {book.description}</p>
            <p>Notes: {book.notes}</p>
            <p>Feeling after reading: {book.feeling}</p>
            <p>Pinned? {book.pinned ? "Yup!" : "Nope!"}</p>
            <p>Done? {book.done ? "Yup!" : "Not yet!"}</p>
            <p>Owned? {book.owned ? "Yup!" : "Not yet!"}</p>
            <p>Course: {book.course}</p>
            <p>Due Date: {book.dueDate}</p>
            <p>Last read on: {book.lastReadingDate}</p>
            <EditDeleteButtons book={book}/>
        </div>
    )
}