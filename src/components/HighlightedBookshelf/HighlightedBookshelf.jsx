import { useState, useEffect } from 'react';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';
import "./HighlightedBookshelf.css";

export default function HighlightedBookshelf() {
    const [bookshelf, setBookshelf] = useState([])

    useEffect(function() {
        (async function getHighlightedBookshelf(){
            const shelf = await bookshelvesAPI.getHighlightedBookshelf();
            setBookshelf(shelf);
        })()
    },[])

    console.log(bookshelf)

    return (
        <div className="highlighted-bookhself">
            <h3>Pinned Bookshelf: {bookshelf.title}</h3>
            <div>
                {bookshelf.books.map((b) => (
                    <p key={b.title}>{b.title}</p>
                ))}
            </div>
        </div>
    )
}