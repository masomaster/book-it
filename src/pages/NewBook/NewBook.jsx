import { useState } from 'react';
// import api from 'zotero-api-client';

import SearchResultItem from '../../components/SearchResultItem/SearchResultItem';
import NewBookForm from '../../components/NewBookForm/NewBookForm';
// import Sidebar from "../../components/Sidebar/Sidebar";
import "./NewBook.css";

export default function NewBook({ user, library, setLibrary, bookshelves, setBookshelves, setShelvesInclBook, shelvesInclBook }) {
    const [searchResults, setSearchResults] = useState("");
    const [queryText, setQueryText] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);

    function handleQuery(evt) {
        evt.preventDefault();
        setQueryText(queryText.trim());
        const url = `https://www.googleapis.com/books/v1/volumes?q=${queryText}`;
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
        <div className="content home">
            <div className="home">
                <div>
                    <h3>Add a Book!</h3>
                    <div className="search-and-add-panels">
                        <div className="search-panel">
                            <form onSubmit={handleQuery}>
                                <input
                                    value={queryText}
                                    type="text"
                                    onChange={(evt) => setQueryText(evt.target.value)}
                                /><br />
                                <button type="submit">Search!</button>
                            </form>
                            <div className="search-results">
                                { searchResults ?
                                    <div>
                                        {searchResults.map(book => (
                                            <SearchResultItem book={book} handlePopulateForm={handlePopulateForm} key={book.id}/>                                
                                        ))}
                                    </div>
                                :
                                    <div>Search for a book to add it to your library!</div>
                                }
                            </div>
                        </div>
                        <NewBookForm user={user} selectedBook={selectedBook} library={library} setLibrary={setLibrary} bookshelves={bookshelves} setBookshelves={setBookshelves} shelvesInclBook={shelvesInclBook} setShelvesInclBook={setShelvesInclBook} handlePopulateForm={handlePopulateForm}/>
                    </div>
                </div>
            </div>
        </div>
    )
}