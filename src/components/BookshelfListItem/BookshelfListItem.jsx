export default function BookshelfListItem({ bookshelf }) {
    return (
        <div className="bookshelf-list-item">
            <p>{bookshelf.title}</p>
            <p>{bookshelf.description}</p>
            {bookshelf.pinned ? <p>Pinned</p> : <div></div>}
            <hr />
        </div>
    )
}