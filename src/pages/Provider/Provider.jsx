import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';

import Home from "../Home/Home";
import NavBar from '../../components/NavBar/NavBar';
import BookList from '../BookList/BookList';
import BookshelfList from '../BookshelfList/BookshelfList';
import NewBook from '../NewBook/NewBook';
import BookDetailPage from '../BookDetailPage/BookDetailPage';
import BookshelfDetailPage from '../BookshelfDetailPage/BookshelfDetailPage';
import Footer from "../../components/Footer/Footer";

import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

export default function Provider({ user, setUser }) {
    const [library, setLibrary] = useState([])
    const [bookshelves, setBookshelves] = useState([])
    const [shelvesInclBook, setShelvesInclBook] = useState([])
    
    useEffect(function() {
        (async function getLibrary(){
          const books = await booksAPI.getLibrary();
          setLibrary(books);
          const bookshelfSet = await bookshelvesAPI.getBookshelves();
          setBookshelves(bookshelfSet);
        })();
      }, [setLibrary, setBookshelves])

    return (
        <>
            <NavBar user = {user} setUser = {setUser}/>
            <Routes>
                <Route 
                        path="/" 
                        element={<Home user={user} library={library} />} />
                    <Route 
                        path="/books" 
                        element={<BookList library={library} />} />
                    <Route 
                        path="/books/new" 
                        element={<NewBook user={user} library={library} setLibrary={setLibrary} bookshelves={bookshelves} setBookshelves={setBookshelves} shelvesInclBook={shelvesInclBook} setShelvesInclBook={setShelvesInclBook} />} />
                    <Route 
                        path="/books/:bookId" 
                        element={<BookDetailPage library={library} setLibrary={setLibrary} bookshelves={bookshelves} setBookshelves={setBookshelves} shelvesInclBook={shelvesInclBook} setShelvesInclBook={setShelvesInclBook} />} />
                    <Route 
                        path="/bookshelves" 
                        element={<BookshelfList user={user} bookshelves={bookshelves} setBookshelves={setBookshelves}/>} />
                    <Route 
                        path="/bookshelves/:bookshelfId" 
                        element={<BookshelfDetailPage bookshelves={bookshelves} setBookshelves={setBookshelves}/>} />
            </Routes>
            <Footer />
        </>
    )
}