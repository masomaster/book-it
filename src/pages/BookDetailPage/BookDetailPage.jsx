import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

import EditBookForm from '../../components/EditBookForm/EditBookForm';
import './BookDetailPage.css';

export default function BookDetailPage({ library, setLibrary, bookshelves, setBookshelves, shelvesInclBook, setShelvesInclBook }) {
    const [editToggle, setEditToggle] = useState(false);
    const [loadingBookshelves, setLoadingBookshelves] = useState(true);
    const { bookId } = useParams();
    const book = library.find((b) => b._id === bookId);
    const navigate = useNavigate();
    
    // Create array of bookshelf titles that include this book
    useEffect(function() {
        (async function getBookshelves(){
            const bookshelfSet = await bookshelvesAPI.getBookshelves();
            setBookshelves(bookshelfSet);
            setLoadingBookshelves(false);
        })();
    }, [setBookshelves])
    
    useEffect(function() {
        if (!loadingBookshelves) {
            const shelves = []
            bookshelves.forEach((s) => {
                s.books.forEach((b) => {
                    if (b._id === book._id) shelves.push(s.title)
                })
            })
            setShelvesInclBook(shelves);
        }
    }, [book._id, bookshelves, setShelvesInclBook, loadingBookshelves])

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
            <h2 className="section-title">{book.title}</h2>
            { editToggle ?
                <EditBookForm book={book} library={library} setLibrary={setLibrary} bookshelves={bookshelves} setBookshelves={setBookshelves} shelvesInclBook={shelvesInclBook} setShelvesInclBook={setShelvesInclBook} setEditToggle={setEditToggle}/>
            : 
                <>
                    <div className="cover-and-info">
                        <div>
                            <img src={book.img} alt="book cover"/>
                        </div>
                        <div className="info-except-descr">
                            <p>Author(s): {book.authors.join(", ")}</p>
                            <p>Published: {book.pubYear}</p>
                            <p>Publisher: {book.publisher}</p>
                            <p>Total Pages: {book.totalPages}</p>
                            <p>Pages Read: {book.pagesRead}</p>
                            <p>Category: {book.category}</p>
                            <p><a href={book.url}>Google Books page</a></p>
                            <p>Bookshelves: {shelvesInclBook?.join(", ")}</p>
                            <p>Feeling after reading: {book.feeling}</p>
                            <p>Pinned? {book.pinned ? "Yup!" : "Nope!"}</p>
                            <p>Done? {book.done ? "Yup!" : "Not yet!"}</p>
                            <p>Owned? {book.owned ? "Yup!" : "Not yet!"}</p>
                            <p>Course: {book.course}</p>
                            <p>Due Date: {book.dueDate}</p>
                            <p>Last read on: {book.lastReadingDate}</p>
                        </div>
                    </div>
                    <div className="notes-desc">
                        <p>Notes: {book.notes}</p>
                        <p>Description: {book.description}</p>
                    </div>
                    <div className="buttons">
                        <button onClick={handleToggle}  className="button-primary">Edit</button>
                        <button onClick={deleteBook}>Delete</button>
                    </div>
                </>
            }
        </div>
    )
}