import { useState, useEffect } from 'react';
import * as booksAPI from '../../utilities/books-api';

export default function BookList({ user }) {
    const [library, setLibrary] = useState([])
    
    const userId = user._id;

    useEffect(function(userId) {
        (async function getLibrary(userId){
            const books = await booksAPI.getLibrary(userId);
            setLibrary(books);
        })();
    }, [])
    
    return (
        <div className="content">
            <p>This is the BookList</p>
            {library.map(book => (
                <p>{book.title}</p>
            ))}
        </div>
    )
}