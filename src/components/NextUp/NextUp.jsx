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
                    <div className="next-up-title">
                        <h4>Keep it up!</h4>
                    </div>
                    <div>
                        <Link to={`/books/${nextUpBook?._id}`}>
                            <img src={nextUpBook?.img} alt="book over"/>
                            <h4>{nextUpBook?.title}</h4>
                        </Link>
                    </div>
                    <div className="book-stats">
                        <p className="remaining-hours">You can finish this book in only <span className="hours">{remainingHours} hours!</span></p>
                        { typeof(nextUpBook?.percentRead) === "number" ?
                            <ProgressBar key={nextUpBook._id} book={nextUpBook} done={nextUpBook.percentRead}/>
                        :
                            <p>Let's start reading!</p>
                        }
                        <div className="buttons">
                            <Link to={`/books/${nextUpBook?._id}`}>
                                <button className="button-primary">Update progress</button>
                            </Link>
                            <Link to={"/books/new"}>
                                <button className="button-primary">Find your next read</button>
                            </Link>
                        </div>
                    </div>
                </>
                : 
                    <>
                        <div className="book-title">
                            <h3 className="section-title">Keep it up!</h3>
                        </div>
                        <p>Pin a book to focus your reading</p>
                    </>
                }
        </div>
    )
}