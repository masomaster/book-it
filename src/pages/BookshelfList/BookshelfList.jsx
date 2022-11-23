import { useState, useEffect } from 'react';
import NewBookshelfForm from '../../components/NewBookshelfForm/NewBookshelfForm';
import BookshelfListItem from '../../components/BookshelfListItem/BookshelfListItem';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

export default function BookshelfList({ user }) {
    const [bookshelves, setBookshelves] = useState([])

    const userId = user._id;

    useEffect(function() {
        (async function getBookshelves(){
            const bookshelfSet = await bookshelvesAPI.getBookshelves();
            setBookshelves(bookshelfSet);
        })();
    }, [])

    return (
        <div className="content">
            <div className="bookshelf-list">
                <h2>Your Bookshelves</h2>
                {bookshelves.map(shelf => (
                    <BookshelfListItem bookshelf={shelf} key={shelf.id} />
                    ))}
            </div>
            <NewBookshelfForm user={user} bookshelves={bookshelves} setBookshelves={setBookshelves}/>
        </div>
    )
}