import { useState } from 'react';
import BookListItem from '../../components/BookListItem/BookListItem';
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

export default function Home({ user }) {
    const [searchResults, setSearchResults] = useState("");
    const [queryText, setQueryText] = useState("");

    function handleQuery(evt) {
        evt.preventDefault();
        setQueryText(queryText.trim());
        const url = `https://www.googleapis.com/books/v1/volumes?q=${queryText}`;
        fetch(url)
        .then((res) => res.json())
        .then((content) => {
            setSearchResults(content.items)
            console.log(searchResults);
            setQueryText("");
        })
        .catch((err) => {
            console.error(err);
        });
    }

    function handlePopulateForm(evt){
        console.log(evt.target);
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
                                <div className="book-list-item" onClick={handlePopulateForm}>
                                    <button key={book.volumeInfo.id}>{book.volumeInfo.title}</button>
                                </div>                        
                            ))}
                        </div>
                    :
                        <div></div>
                    }
                </div>
            </div>
            <Sidebar user = {user}/>
        </div>
    )
}