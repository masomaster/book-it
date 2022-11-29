export default function Book({ book }) {
    return (
        <div className="current-list-item">
            <div>
                <img src={book.img} alt="book cover"/>
            </div>
            <p>{book.title}</p>
        </div>
    )
}