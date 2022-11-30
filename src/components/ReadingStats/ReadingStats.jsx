import { useState, useEffect } from 'react';
import * as booksAPI from '../../utilities/books-api';
import Book from "../Book/Book";

export default function ReadingStats({ user, library }) {    
    const [finishedBooks, setFinishedBooks] = useState([])
    
    let totalPages = 0;
    library.forEach(function(b) {
        totalPages += b.pagesRead;
    })
    
    const speed = 25;
    const totalHours = totalPages / speed;
    
    useEffect(function() {
        (async function getBooksRead(){
            const books = await booksAPI.getBooksRead();
            setFinishedBooks(books);
        })()
    },[])

    return (
        <div>
            <h3>ReadingStats</h3>
            <p>You've read {finishedBooks.length} books</p>
            <p>totaling {totalPages} pages</p>
            {totalHours ? <p>{`in ${totalHours} hours`}</p> : ''}
            <p>ADD READING STREAK ONCE IMPLEMENTED IN MODEL</p>
            <p>Here are some:</p>
            <div className="highlighted-bookshelf-list">
                {finishedBooks.map(b => (<Book key={b._id} book={b}/>))}
            </div>
        </div>
    )
}