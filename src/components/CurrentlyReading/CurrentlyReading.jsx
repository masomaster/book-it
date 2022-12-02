import { useState, useEffect } from 'react';
import Book from '../Book/Book';
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
            <h3 className="section-title">Books You're Currently Enjoying</h3>
            <div className="horizontal-book-list">
                {inProgressBooks.slice(0, 4).map(book => (
                <div className="horizontal-book-list-item" key={book._id}>
                    <Book book={book} key={book.title} />
                    <ProgressBar done={book.percentRead} key={book._id}/>
                    <p>About {Math.round((book.remainingPages / 30) + Number.EPSILON) * 100 /100} hours to finish</p>
                </div>
                ))}
            </div>
        </div>
    )
}