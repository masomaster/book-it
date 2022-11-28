export default function BookListItem({ book }) {
    return (
        <div className="book-list-item">
            <div><img src={book.img} /></div>
            <p>{book.title} by {book.authors}</p>
            <p>{book.percentRead}</p>
        </div>
    )
}