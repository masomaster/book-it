import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as booksAPI from '../../utilities/books-api';
import EditBookForm from '../../components/EditBookForm/EditBookForm';
import './BookDetailPage.css';

export default function BookDetailPage({ library, setLibrary }) {
    const [editToggle, setEditToggle] = useState(false);
    const { bookId } = useParams();
    const book = library.find((b) => b._id === bookId);
    const navigate = useNavigate();
    
    function handleToggle() {
        setEditToggle(!editToggle)
    }

    async function deleteBook() {
        const books = await booksAPI.deleteBookshelf(book._id);
        setLibrary(books);
        navigate("/books");
    }

    return (
        <div className="book-detail-page">
            <h2>{book.title}</h2>
            { editToggle ?
                <EditBookForm book={book} library={library} setLibrary={setLibrary} setEditToggle={setEditToggle}/>
            : 
                <>
                    <div>
                        <img src={book.img} alt="book cover"/>
                    </div>
                    {book.authors.map((a, idx) => (
                        <p key={idx}>{a}</p>
                    ))}
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
                    <div className="buttons">
                        <button onClick={handleToggle}>Edit</button>
                        <button onClick={deleteBook}>Delete</button>
                    </div>
                </>
            }
        </div>
    )
}