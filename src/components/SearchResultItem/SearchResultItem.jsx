export default function SearchResultItem({ book, handlePopulateForm }) {
    function handleClick() {
        handlePopulateForm(book);
    }
    
    return (
        <div className="book-list-item">
            <div>
                <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt="book cover"/>
            </div>
            <p>{book.volumeInfo.title}</p>
            <p>{book.volumeInfo.authors[0]}</p>
            <button onClick={handleClick}>This is it!</button>
        </div>
    )
}                                    