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
    
    return (
        <div className="highlighted-bookhself">
            <h3>Pinned Bookshelf: {bookshelf.title}</h3>
            <div></div>
        </div>
    )
}