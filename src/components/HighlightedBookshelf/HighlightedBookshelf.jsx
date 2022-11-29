import { useState, useEffect } from 'react';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';
import "./HighlightedBookshelf.css";

export default function HighlightedBookshelf() {
    const [bookshelf, setBookshelf] = useState([])
    const [books, setBooks] = useState([])

    useEffect(function() {
        (async function getHighlightedBookshelf(){
            const shelfAndBooks = await bookshelvesAPI.getHighlightedBookshelf();
            console.log(shelfAndBooks)
            setBookshelf(shelfAndBooks.bookshelf);
            setBooks(shelfAndBooks.books);
        })()
    },[])
    

    // Could I have another function here that returns all books with bookshelf: bookshelf._id?
    return (
        <div className="highlighted-bookhself">
            <h3>Pinned Bookshelf: {bookshelf.title}</h3>
            <div>
                {books.map((b) => (
                    <p key={b.title}>{b.title}</p>
                ))}
            </div>
        </div>
    )
}