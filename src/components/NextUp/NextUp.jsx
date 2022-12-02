import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as booksAPI from '../../utilities/books-api';
import ProgressBar from '../ProgressBar/ProgressBar';
import "./NextUp.css";

export default function NextUp() {
    const [nextUpBook, setNextUpBook] = useState(null);
    const readingSpeed = 30; //this is a placeholder number until user's readingSpeed can be imported

    useEffect(function() {
        (async function getNextUp(){
            const book = await booksAPI.getNextUp();
            setNextUpBook(book);
        })()
    },[])

    const remainingHours = Math.round((nextUpBook?.remainingPages / readingSpeed) + Number.EPSILON) * 100 /100;

    return (
        <div className="next-up">
                { nextUpBook ?
                <>
                    <div className="book-title">
                        <h3 className="section-title">Keep it up!</h3>
                        <h4>{nextUpBook?.title}</h4>
                    </div>
                    <div className="book-img">
                        <Link to={`/books/${nextUpBook?._id}`}>
                            <img src={nextUpBook?.img} alt="book over"/>
                        </Link>
                    </div>
                    <div className="book-stats">
                        <p className="remaining-hours">You can finish this book in only {remainingHours} hours!</p>
                        { typeof(nextUpBook?.percentRead) === "number" ?
                            <ProgressBar key={nextUpBook._id} book={nextUpBook} done={nextUpBook.percentRead}/>
                        :
                            <p>Let's start reading!</p>
                        }
                        <Link to={`/books/${nextUpBook?._id}`}>
                            <button className="button-primary">Update progress</button>
                        </Link>
                        <Link to={"/books/new"}>
                            <button className="button-primary">Find your next read</button>
                        </Link>
                    </div>
                </>
                : 
                    <>
                        <div className="book-title">
                            <h3 className="section-title">Next up:</h3>
                        </div>
                        <p>Pin a book to focus your reading</p>
                    </>
                }
        </div>
    )
}