import NewBookshelfForm from '../../components/NewBookshelfForm/NewBookshelfForm';
import BookshelfListItem from '../../components/BookshelfListItem/BookshelfListItem';

export default function BookshelfList({ user, bookshelves, setBookshelves }) {
    

    return (
        <div className="content">
            <div className="bookshelf-list">
                <h2>Your Bookshelves</h2>
                {bookshelves.map(shelf => (
                    <BookshelfListItem bookshelf={shelf} key={shelf._id} bookshelves={bookshelves}/>
                    ))}
            </div>
            <h3>Add a Bookshelf</h3>
            <NewBookshelfForm user={user} bookshelves={bookshelves} setBookshelves={setBookshelves}/>
        </div>
    )
}