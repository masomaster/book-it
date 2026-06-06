import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utilities/users-service';
import SearchResultItem from '../../components/SearchResultItem/SearchResultItem';
import NewBookForm from '../../components/NewBookForm/NewBookForm';
import BookRecs from '../../components/BookRecs/BookRecs';
import "./NewBook.css";

// import api from 'zotero-api-client';

export default function NewBook({ user, library, setLibrary, bookshelves, setBookshelves, setShelvesInclBook, shelvesInclBook }) {
    /** `null` = not searched yet; array = last search outcome (may be empty) */
    const [searchResults, setSearchResults] = useState(null);
    const [searchHint, setSearchHint] = useState(null);
    const [queryText, setQueryText] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();
    const scrollToForm = useRef();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    async function handleQuery(evt) {
        evt.preventDefault();
        const q = queryText.trim();
        if (!q) return;

        setSearchHint(null);

        const token = getToken();
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        try {
            const res = await fetch(
                `/api/books/google-volumes?q=${encodeURIComponent(q)}`,
                { headers }
            );
            let content;
            try {
                content = await res.json();
            } catch {
                setSearchResults([]);
                setSearchHint('Search returned an unreadable response. Try again.');
                return;
            }

            if (!res.ok) {
                console.error('Book search:', content);
                setSearchResults([]);
                setSearchHint(
                    content.message ||
                        'Book search failed. Check GOOGLE_BOOKS_API_KEY on the server and try again.'
                );
                return;
            }

            if (content.error) {
                const msg =
                    typeof content.error === 'object' && content.error.message
                        ? content.error.message
                        : String(content.error);
                console.error('Google Books:', content.error);
                setSearchResults([]);
                setSearchHint(msg);
                return;
            }

            const items = Array.isArray(content.items) ? content.items : [];
            setSearchResults(items);
            setQueryText('');
            if (items.length === 0) {
                setSearchHint(
                    'No volumes matched. Try title + author, or add manually on the right.'
                );
            }
        } catch (err) {
            console.error(err);
            setSearchResults([]);
            setSearchHint(
                'Could not reach the app server. For local dev, run npm run server on port 3001.'
            );
        }
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
                    <BookRecs library={library} />
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
                        {searchResults === null ? (
                            <div className="manual-instructions">
                                <p className="manual-instructions-text">Or add it manually</p><img className="manual-instructions-arrow" src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-droite-orange.png" alt="arrow"/>
                            </div>
                        ) : searchResults.length === 0 ? (
                            <p className="search-results-empty">
                                {searchHint ||
                                    'No books found. Try different keywords, or add manually on the right.'}
                            </p>
                        ) : (
                            <div className="search-results">
                                {searchResults.map(book => (
                                    <SearchResultItem book={book} handlePopulateForm={handlePopulateForm} key={book.id}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <NewBookForm user={user} selectedBook={selectedBook} setSelectedBook={setSelectedBook} library={library} setLibrary={setLibrary} bookshelves={bookshelves} setBookshelves={setBookshelves} shelvesInclBook={shelvesInclBook} setShelvesInclBook={setShelvesInclBook} scrollToForm={scrollToForm} handlePopulateForm={handlePopulateForm}/>
            </div>
        </div>
    )
}