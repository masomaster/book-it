import './SearchResultItem.css';
import '../Book/Book.css';
import { httpsUrl } from '../../utilities/https-url';

export default function SearchResultItem({ book, handlePopulateForm }) {
    function handleClick() {
        handlePopulateForm(book);
    }
    
    return (
        <div className="book-list-item" onClick={handleClick}>
            <div className="book-cover-img">
                <img src={httpsUrl(book.volumeInfo.imageLinks?.smallThumbnail)} alt="book cover"/>
            </div>
            <p>{book.volumeInfo.title}</p>
            <p>{book.volumeInfo.authors ? book.volumeInfo?.authors[0] : ''}</p>
            <button>This is it!</button>
        </div>
    )
}                                    