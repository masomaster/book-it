import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

import EditBookForm from '../../components/EditBookForm/EditBookForm';
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import './BookDetailPage.css';

export default function BookDetailPage({ library, setLibrary, bookshelves, setBookshelves, shelvesInclBook, setShelvesInclBook }) {
    const [editToggle, setEditToggle] = useState(false);
    const [loadingBookshelves, setLoadingBookshelves] = useState(true);
    const { bookId } = useParams();
    const book = library.find((b) => b._id === bookId);
    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    // Create array of bookshelf titles that include this book
    useEffect(function() {
        (async function getBookshelves(){
            const bookshelfSet = await bookshelvesAPI.getBookshelves();
            setBookshelves(bookshelfSet);
            setLoadingBookshelves(false);
        })();
    }, [setShelvesInclBook])
    
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
    }, [book._id, bookshelves, loadingBookshelves])

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
            <div className="arrow-and-title">
                <img className="back-arrow" src="https://seekicon.com/free-icon-download/arrow-ios-back_1.svg" alt="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="section-title">{book.title}</h2>
            </div>
            { editToggle ?
                <EditBookForm book={book} library={library} setLibrary={setLibrary} bookshelves={bookshelves} setBookshelves={setBookshelves} shelvesInclBook={shelvesInclBook} setShelvesInclBook={setShelvesInclBook} setEditToggle={setEditToggle}/>
            : 
                <>
                    <div className="cover-and-info">
                        <div className="cover-progress">
                            <img src={book.img} alt="book cover"/>
                            {typeof(book.percentRead) === "number" ?
                                <ProgressBar done={book.percentRead}/>
                                :
                                <p>{book.percentRead}</p>
                            }
                        </div>
                        <div className="info-except-descr">
                            <p><span className="hours">Author(s):</span> {book.authors.join(", ")}</p>
                            <p><span className="hours">Published:</span>  {book.pubYear}</p>
                            <p><span className="hours">Publisher:</span>  {book.publisher}</p>
                            <p><span className="hours">Total Pages:</span>  {book.totalPages}</p>
                            <p><span className="hours">Pages Read:</span>  {book.pagesRead}</p>
                            <p><span className="hours">Category:</span>  {book.category}</p>
                            <p><span className="hours">Bookshelves:</span>  {shelvesInclBook?.join(", ")}</p>
                            <p><span className="hours">Feeling after reading:</span>  {book.feeling}</p>
                            <p><span className="hours">Pinned?</span>  {book.pinned ? "Yup!" : "Nope!"}</p>
                            <p><span className="hours">Done?</span>  {book.done ? "Yup!" : "Not yet!"}</p>
                            <p><span className="hours">Owned?</span>  {book.owned ? "Yup!" : "Not yet!"}</p>
                            <p><span className="hours">Course:</span>  {book.course}</p>
                            <p><span className="hours">Due Date:</span>  {book.dueDate}</p>
                            <p><span className="hours">Last read on:</span>  {book.lastReadingDate}</p>
                            <p><span className="hours"><a href={book.url}>Google Books page</a></span> </p>
                        </div>
                    </div>
                    <div className="notes-desc">
                        <p><span className="hours">Notes:</span>  {book.notes}</p>
                        <p><span className="hours">Description:</span>  {book.description}</p>
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