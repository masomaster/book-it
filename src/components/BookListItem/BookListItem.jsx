export default function BookListItem({ book }) {
    return (
        <div className="book-list-item">
            <p>Title: {book.title}</p>
        </div>
    )
}