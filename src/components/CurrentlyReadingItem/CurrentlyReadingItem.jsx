import ProgressBar from "../ProgressBar/ProgressBar";

export default function CurrentlyReadingItem({ book }) {
    return (
        <div className="current-list-item">
            <div><img src={book.img} alt="book cover"/></div>
            <p>{book.title}</p>
            <ProgressBar done={book.percentRead}/>
        </div>
    )
}