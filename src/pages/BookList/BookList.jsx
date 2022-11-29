import { Link } from 'react-router-dom';
import BookListItem from '../../components/BookListItem/BookListItem';
import NewBookForm from '../../components/NewBookForm/NewBookForm';

export default function BookList({ user, library, setLibrary }) {
    return (
        <div className="content">
            <div className="book-list">
                <h2>Your Library</h2>
                <Link to="/books/new"><button>Add a Book!</button></Link>
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