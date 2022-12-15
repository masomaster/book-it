import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookListItem from '../../components/BookListItem/BookListItem';
import './BookList.css';

export default function BookList({ library }) {    
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
        <div className="book-list-page">
            <div className="arrow-and-title">
                <img className="back-arrow" src="https://seekicon.com/free-icon-download/arrow-ios-back_1.svg" alt="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="section-title">Your Library</h2>
            </div>
            <div className="book-list-and-button">
                <div className="add-book-button">
                    <Link to="/books/new">
                        <button className="button-primary">Add a Book!</button>
                    </Link>
                </div>
                { library.length ?
                    <div className="book-list">
                        {library.map(book => (
                            <BookListItem book={book} key={book.id}/>
                        ))}
                    </div>
                :
                    ''
                }
            </div>
        </div>
    )
}