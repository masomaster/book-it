import { useState } from 'react';
import SearchResultItem from '../../components/SearchResultItem/SearchResultItem';
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

export default function Home({ user }) {
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
        // Manipulate data to fit NewBookForm (=== model)
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

    return (
        <div className="content home">
            <div className="home">
                <p>This is the home page</p>
                <div>
                    <h3>Testing Area for Google API</h3>
                    <form onSubmit={handleQuery}>
                        <input
                            value={queryText}
                            type="text"
                            onChange={(evt) => setQueryText(evt.target.value)}
                        />
                        <button type="submit">Search!</button>
                    </form>
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
            <Sidebar user = {user} selectedBook={selectedBook} handlePopulateForm={handlePopulateForm}/>
        </div>
    )
}