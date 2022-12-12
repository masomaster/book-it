import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Book from "../../components/Book/Book";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import EditBookshelfForm from "../../components/EditBookshelfForm/EditBookshelfForm";
import * as bookshelvesAPI from '../../utilities/bookshelves-api';
import './BookshelfDetailPage.css';

export default function BookshelfDetailPage({ bookshelves, setBookshelves }) {
    const [editToggle, setEditToggle] = useState(false);
    const { bookshelfId } = useParams();
    const bookshelf = bookshelves.find((b) => b._id === bookshelfId);
    const navigate = useNavigate();

    function handleToggle() {
        setEditToggle(!editToggle)
    }

    async function deleteBookshelf() {
        const bookshelves = await bookshelvesAPI.deleteBookshelf(bookshelf._id);
        setBookshelves(bookshelves);
        navigate("/bookshelves");
    }

    return (
        <div className="bookshelf-detail-page">
            <div className="arrow-and-title">
                <img className="back-arrow" src="https://seekicon.com/free-icon-download/arrow-ios-back_1.svg" alt="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="section-title">{bookshelf.title} Bookshelf</h2>
            </div>
            { editToggle ?
                <EditBookshelfForm bookshelf={bookshelf} bookshelves={bookshelves} setBookshelves={setBookshelves} setEditToggle={setEditToggle}/>
            : 
                <div className="bookshelf-info">
                    <h5><span className="hours">Description:</span></h5><p>{bookshelf.description}</p>
                    <p><span className="hours">Pinned?</span> {bookshelf.pinned ? "Yup!" : "Nope!"}</p>
                    <button className="button-primary" onClick={handleToggle}>Edit</button>
                    <button onClick={deleteBookshelf}>Delete</button>
                </div>
            }
            <div className="horizontal-book-list">
                {bookshelf.books.map(b => (
                    <div>
                        <Book key={b.title} book={b}/>
                        { typeof(b.percentRead) === "number" ?
                            <ProgressBar key={b._id} book={b} done={b.percentRead}/>
                        :
                            <p>Let's start reading!</p>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}