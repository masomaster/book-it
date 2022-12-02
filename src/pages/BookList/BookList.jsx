import { Link, useNavigate } from 'react-router-dom';
import BookListItem from '../../components/BookListItem/BookListItem';
import './BookList.css';

export default function BookList({ library }) {    
    const navigate = useNavigate();
    
    return (
        <div className="book-list-page">
            <div className="arrow-and-title">
                <img className="back-arrow" src="https://seekicon.com/free-icon-download/arrow-ios-back_1.svg" onClick={() => navigate(-1)} />
                <h2 className="section-title">Your Library</h2>
            </div>
            <div className="book-list-and-button">
                { library.length ?
                    <div className="book-list">
                        {library.map(book => (
                            <BookListItem book={book} key={book.id}/>
                        ))}
                    </div>
                :
                    ''
                }
                <div>
                    <Link to="/books/new">
                        <button className="button-primary">Add a Book!</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}