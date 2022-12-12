import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as booksAPI from '../../utilities/books-api';
import Book from "../Book/Book";
import './ReadingStats.css';

export default function ReadingStats({ user, library }) {    
    const [finishedBooks, setFinishedBooks] = useState([])
    
    let totalPages = 0;
    library.forEach(function(b) {
        totalPages += b.pagesRead;
    })
    
    const speed = 30;
    const totalHours = Math.round((totalPages / speed) + Number.EPSILON) * 100 /100;
    
    useEffect(function() {
        (async function getBooksRead(){
            const books = await booksAPI.getBooksRead();
            setFinishedBooks(books);
        })()
    },[])

    return (
        <div className="reading-stats">
            { library.length ?
                <h4>You're a reaching machine!</h4>
            :
                <>
                    <h4>Add a book and start reading and enter progress to see your stats</h4>
                    <Link to={"/books/new"}>
                        <button className="button-primary">Find your next read</button>
                    </Link>
                </>
            }
            <table className="close">
                <tbody>
                    <tr>
                        <td>You've read:</td>
                        <td className="emph-stats">{finishedBooks.length} books</td>
                    </tr>
                    <tr>
                        <td>totaling:</td>
                        <td className="emph-stats">{totalPages} pages</td>
                    </tr>
                    <tr>
                        <td>in:</td>
                        <td className="emph-stats">{totalHours} hours</td>
                    </tr>
                </tbody>
            </table>
            { finishedBooks.length ?
                <h5>Here are some of the many books you've finished!</h5>
            :
                <h5>Finish a book to see it listed here!</h5>
            }
            <div className="horizontal-book-list">
                {finishedBooks.slice(0, 3).map(b => (<Book key={b._id} book={b}/>))}
            </div>
        </div>
    )
}