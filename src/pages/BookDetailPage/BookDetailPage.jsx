import { useParams } from "react-router-dom";
import './BookDetailPage.css';

export default function BookDetailPage({ library }) {
    const { bookId } = useParams();
    const book = library.find((b) => b._id === bookId);
    
    return (
        <div className="book-detail-page">
            <h2>{book.title}</h2>
            <div>
                <img src={book.img} alt="book cover"/>
            </div>
            <p></p>
        </div>
    )
}