import { useNavigate } from 'react-router-dom';
import NewBookshelfForm from '../../components/NewBookshelfForm/NewBookshelfForm';
import BookshelfListItem from '../../components/BookshelfListItem/BookshelfListItem';
import './BookshelfList.css';

export default function BookshelfList({ user, bookshelves, setBookshelves }) {
    const navigate = useNavigate();

    return (
        <div className="bookshelf-list-page">
            <div className="arrow-and-title">
                <img className="back-arrow" src="https://seekicon.com/free-icon-download/arrow-ios-back_1.svg" alt="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="section-title">Your Bookshelves</h2>
            </div>
            <div className="bookshelf-list-and-form">
                <div className="bookshelf-list">
                    {bookshelves.map(shelf => (
                        <BookshelfListItem bookshelf={shelf} key={shelf._id} bookshelves={bookshelves}/>
                        ))}
                </div>
                <div className="new-bookshelf-form">
                    <h3>Add a Bookshelf</h3>
                    <NewBookshelfForm user={user} bookshelves={bookshelves} setBookshelves={setBookshelves}/>
                </div>
            </div>
        </div>
    )
}