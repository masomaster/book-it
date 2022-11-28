import { useState, useEffect } from 'react';
import * as booksAPI from '../../utilities/books-api';
import ProgressBar from '../ProgressBar/ProgressBar';
import "./NextUp.css";

export default function NextUp() {
    // here or elsewhere?
    // I need a function that retrieves ONE pinned book for now (.findOne()).
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
            <div className="book-img">
                <img src={nextUpBook?.img} alt="book over"/>
            </div>
            <h4 className="book-title">Next up: {nextUpBook?.title}!</h4>
            <p className="remaining-hours">You can finish this book in only {remainingHours} hours!</p>
            <ProgressBar done={nextUpBook?.percentRead}/>
            <div className="buttons">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}