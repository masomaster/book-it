import { useState, useEffect } from 'react';
import CurrentlyReadingItem from '../CurrentlyReadingItem/CurrentlyReadingItem';
import * as booksAPI from '../../utilities/books-api';
import "./CurrentlyReading.css";

export default function CurrentlyReading() {
    const [inProgressBooks, setInProgressBooks] = useState([])

    useEffect(function() {
        (async function getNextUp(){
            const books = await booksAPI.getInProgressBooks();
            setInProgressBooks(books);
        })()
    },[])
    console.log("inProgressBooks: ", inProgressBooks);

    return (
        <div className="currently-reading-panel">
            <h3>Books You're Currently Enjoying</h3>
            <div className="currently-reading-list">
                {inProgressBooks.map(book => (
                <CurrentlyReadingItem book={book} key={book.id}/>
                ))}
            </div>
        </div>
    )
}