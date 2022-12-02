import { Link } from 'react-router-dom';
import BookListItem from '../../components/BookListItem/BookListItem';
import './BookList.css';

export default function BookList({ library }) {    
    return (
        <div className="book-list-page">
            <h2 className="section-title">Your Library</h2>
            <div className="book-list-and-button">
                <div className="book-list">
                    {library.map(book => (
                        <BookListItem book={book} key={book.id}/>
                    ))}
                </div>
                <div>
                    <Link to="/books/new">
                        <button className="button-primary">Add a Book!</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}