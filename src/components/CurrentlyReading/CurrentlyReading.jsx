import { useState, useEffect } from 'react';
import CurrentlyReadingItem from '../Book/Book';
import ProgressBar from '../ProgressBar/ProgressBar';
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

    return (
        <div className="currently-reading-panel">
            <h3>Books You're Currently Enjoying</h3>
            <div className="currently-reading-list">
                {inProgressBooks.map(book => (
                <div className="currently-reading-item" key={book._id}>
                    <CurrentlyReadingItem book={book} key={book.title} />
                    <p>Just about {book.remainingPages / 25} hours to finish</p>
                    <ProgressBar done={book.percentRead} key={book._id}/>
                </div>
                ))}
            </div>
        </div>
    )
}