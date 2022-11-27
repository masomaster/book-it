export default function SearchResultItem({ book, handlePopulateForm }) {
    function handleClick() {
        handlePopulateForm(book);
    }
    
    return (
        <div className="book-list-item">
            <p>Title: {book.volumeInfo.title}</p><button onClick={handleClick}>This is it!</button>
        </div>
    )
}                                    