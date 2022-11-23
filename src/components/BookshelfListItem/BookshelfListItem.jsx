export default function BookshelfListItem({ bookshelf }) {
    return (
        <div className="bookshelf-list-item">
            <p>Title: {bookshelf.title}</p>
        </div>
    )
}