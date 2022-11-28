import { useState, useEffect } from 'react';
import * as booksAPI from '../../utilities/books-api';

import BookListItem from '../../components/BookListItem/BookListItem';
import NewBookForm from '../../components/NewBookForm/NewBookForm';

export default function BookList({ user }) {
    const [library, setLibrary] = useState([])
    
    let totalPages = 0;
    library.forEach(function(b) {
        totalPages += b.pagesRead;
    })

    const speed = user.readingSpeed;
    const totalHours = totalPages / speed;

    useEffect(function() {
        (async function getLibrary(){
            const books = await booksAPI.getLibrary();
            setLibrary(books);
        })();
    }, [])

    return (
        <div className="content">
            <div className="book-list">
                <p>You've read {totalHours ? `for {totalHours} hours totalling` : ''} {totalPages} pages!</p>
                <h2>Your Library</h2>
                <div className="book-list-item">
                    {library.map(book => (
                    <BookListItem book={book} key={book.id}/>
                    ))}
                </div>
            </div>
            <NewBookForm user = {user} library={library} setLibrary={setLibrary}/>
        </div>
    )
}