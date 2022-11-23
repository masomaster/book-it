import { useState, useEffect } from 'react';
import * as booksAPI from '../../utilities/books-api';

import BookListItem from '../../components/BookListItem/BookListItem';
import NewBookForm from '../../components/NewBookForm/NewBookForm';

export default function BookList({ user }) {
    const [library, setLibrary] = useState([])
    
    const userId = user._id;

    useEffect(function() {
        (async function getLibrary(){
            const books = await booksAPI.getLibrary();
            setLibrary(books);
        })();
    }, [])

    return (
        <div className="content">
            <div className="book-list">
                <h2>Your Library</h2>
                <div className="book=list-item">
                    {library.map(book => (
                    <BookListItem book={book} key={book.id}/>
                    ))}
                </div>
            </div>
            <NewBookForm user = {user} library={library} setLibrary={setLibrary}/>
        </div>
    )
}