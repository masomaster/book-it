import { useEffect } from "react";
import NextUp from "../../components/NextUp/NextUp";
import CurrentlyReading from "../../components/CurrentlyReading/CurrentlyReading";
import HighlightedBookshelf from "../../components/HighlightedBookshelf/HighlightedBookshelf";
import ReadingStats from "../../components/ReadingStats/ReadingStats";
// import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

export default function Home({ user, library, setLibrary, setBookshelves }) {
    
    useEffect(function() {
        (async function getLibrary(){
          const books = await booksAPI.getLibrary();
          setLibrary(books);
        })();
    }, [setLibrary])

    useEffect(function() {
        (async function getBookshelves(){
            const bookshelfSet = await bookshelvesAPI.getBookshelves();
            setBookshelves(bookshelfSet);
        })();
    }, [setBookshelves])

    return (
        <div className="content">
            <div className="summary-pane">
                <NextUp />
                <CurrentlyReading />
                <HighlightedBookshelf />
                <ReadingStats user={user} library={library}/>
            </div>
            {/* <Sidebar user = {user}/> */}
        </div>
    )
}