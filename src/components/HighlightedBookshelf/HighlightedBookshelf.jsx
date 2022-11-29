import { useState, useEffect } from 'react';
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
            setBooks(shelf.books);
        })()
    },[])

    return (
        <div className="highlighted-bookshelf-panel">
            <h3>Pinned Bookshelf: {bookshelf.title}</h3>
            <div className="highlighted-bookshelf-list">
                {books.map((b) => (
                    <CurrentlyReadingItem book={b} key={b.id} />
                    ))}
            </div>
        </div>
    )
}