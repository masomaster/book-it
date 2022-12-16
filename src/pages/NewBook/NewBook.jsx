import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import api from 'zotero-api-client';

import SearchResultItem from '../../components/SearchResultItem/SearchResultItem';
import NewBookForm from '../../components/NewBookForm/NewBookForm';
// import Sidebar from "../../components/Sidebar/Sidebar";
import "./NewBook.css";

export default function NewBook({ user, library, setLibrary, bookshelves, setBookshelves, setShelvesInclBook, shelvesInclBook }) {
    const [searchResults, setSearchResults] = useState("");
    const [queryText, setQueryText] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();
    const scrollToForm = useRef();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    function handleQuery(evt) {
        evt.preventDefault();
        setQueryText(queryText.trim());
        const url = `https://www.googleapis.com/books/v1/volumes?q=${queryText}&maxResults=20`;
        fetch(url)
        .then((res) => res.json())
        .then((content) => {
            setSearchResults(content.items)
            setQueryText("");
        })
        .catch((err) => {
            console.error(err);
        });
    }

    function handlePopulateForm(book){        
        const transformedBook = {
            title: book.volumeInfo.title ? book.volumeInfo.title : '',
            authors: book.volumeInfo.authors ? book.volumeInfo.authors[0] : '',
            pubYear: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.slice(0, 4) : '',
            publisher: book.volumeInfo.publisher ? book.volumeInfo.publisher : '',
            totalPages: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : '',
            category: book.volumeInfo.categories ? book.volumeInfo.categories[0] : '',
            url: book.volumeInfo.previewLink ? book.volumeInfo.previewLink : '',
            description: book.volumeInfo.description ? book.volumeInfo.description : '',
            course: '',
            pagesRead: '',
            dueDate: '',
            img: book.volumeInfo.imageLinks?.smallThumbnail,
        }
        setSelectedBook(transformedBook)
        scrollToForm.current.scrollIntoView({behavior:"smooth"})
    }

    /*-- Testing Zotero API 
    
    const userID = 936323;
    const AUTH_KEY = 'WSc3Li6IhumS3IPwLkHeqrBf';
    const myapi = api(AUTH_KEY).library('user', userID);
    async function getZoteroInfo() {
        const response = await api().library('user', 475425).collections('X42A7DEE').items().get();
        const response = 'https://api.zotero.org/users/475425/items/X42A7DEE?v=3';
        fetch(response)
        .then((res) => res.json())
        .then((content) => {
            console.log(content)
        })
        const items = response.getData();
        console.log(items);
        const itemsResponse = await myapi.items().get();
        console.log(itemsResponse);
    }
    getZoteroInfo()

    -- */

    return (
        <div className="new-book">
            <div className="arrow-and-title">
                <img className="back-arrow" src="https://seekicon.com/free-icon-download/arrow-ios-back_1.svg" alt="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="section-title">Add a Book!</h2>
            </div>
            <div className="search-and-add-panels">
                <div className="search-panel">
                    <form onSubmit={handleQuery}>
                        <input
                            value={queryText}
                            type="text"
                            placeholder="Enter book info to search Google"
                            onChange={(evt) => setQueryText(evt.target.value)}
                        /><br />
                        <button type="submit" className="button-primary">Search!</button>
                    </form>
                    <div>
                        { searchResults ?
                            <div className="search-results">
                                {searchResults.map(book => (
                                    <SearchResultItem book={book} handlePopulateForm={handlePopulateForm} key={book.id}/>                                
                                ))}
                            </div>
                        :
                            <div className="alt-instructions"><p className="alt-instructions-text">Or add it manually</p><img className="alt-instructions-arrow" src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-droite-orange.png" /></div>
                        }
                    </div>
                </div>
                <NewBookForm user={user} selectedBook={selectedBook} library={library} setLibrary={setLibrary} bookshelves={bookshelves} setBookshelves={setBookshelves} shelvesInclBook={shelvesInclBook} setShelvesInclBook={setShelvesInclBook} scrollToForm= {scrollToForm}handlePopulateForm={handlePopulateForm}/>
            </div>
        </div>
    )
}