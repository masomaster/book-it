import { useState, useEffect } from 'react';
import * as booksAPI from '../../utilities/books-api';

export default function ReadingStats({ user, library }) {    
    const [totalBooks, setTotalBooks] = useState([])
    
    let totalPages = 0;
    library.forEach(function(b) {
        totalPages += b.pagesRead;
    })
    
    const speed = 25;
    const totalHours = totalPages / speed;
    
    useEffect(function() {
        (async function getBooksRead(){
            const books = await booksAPI.getBooksRead();
            setTotalBooks(books);
        })()
    },[])

    return (
        <div>
            <h3>ReadingStats</h3>
            <p>You've read:</p>
            {totalBooks.map(b => <p key={b._id}>{b.title}</p>)}
            <p>totaling {totalPages} pages</p>
            {totalHours ? <p>{`in ${totalHours} hours`}</p> : ''}
        </div>
    )
}