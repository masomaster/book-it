import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Book from "../../components/Book/Book";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import EditBookshelfForm from "../../components/EditBookshelfForm/EditBookshelfForm";
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

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
            <h2>{bookshelf.title} Bookshelf</h2>
            { editToggle ?
                <EditBookshelfForm bookshelf={bookshelf} bookshelves={bookshelves} setBookshelves={setBookshelves} setEditToggle={setEditToggle}/>
            : 
                <>
                    <p>Description: {bookshelf.description}</p>
                    <p>Pinned? {bookshelf.pinned ? "Yup!" : "Nope!"}</p>
                    <button onClick={handleToggle}>Edit</button>
                    <button onClick={deleteBookshelf}>Delete</button>

                </>
            }
            <div className="horizontal-book-list">
                {bookshelf.books.map(b => (
                    <div>
                        <Book key={b.title} book={b}/>
                        <ProgressBar key={b._id} book={b} done={b.percentRead}/>
                    </div>
                ))}
            </div>
        </div>
    )
}