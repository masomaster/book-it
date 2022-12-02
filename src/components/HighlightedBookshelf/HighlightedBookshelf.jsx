import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';
import CurrentlyReadingItem from '../Book/Book';
import "./HighlightedBookshelf.css";

export default function HighlightedBookshelf() {
    const [bookshelf, setBookshelf] = useState({})
    const [books, setBooks] = useState([])

    useEffect(function() {
        (async function getHighlightedBookshelf(){
            const shelf = await bookshelvesAPI.getHighlightedBookshelf();
            setBookshelf(shelf);
            setBooks(shelf?.books);
        })()
    },[])

    return (
        <div className="highlighted-bookshelf-panel">
            { bookshelf ? 
                <>
                    <h3 className="section-title">Pinned Bookshelf: <Link to={`/bookshelves/${bookshelf._id}`} className="section-title">{bookshelf?.title}</Link></h3>
                    <div className="horizontal-book-list">
                        {books?.slice(0, 4).map((b) => (
                            <div className="horizontal-book-list-item" key={b?._id}>
                                <CurrentlyReadingItem book={b} key={b?.id} />
                            </div>
                            ))}
                    </div>
                </>
            :
                <>
                    <p>Add some books and start reading to see your progress!</p>
                    <Link to={"/books/new"}>
                        <button className="button-primary">Find your next read</button>
                    </Link>
                </>
            }
        </div>
    )
}