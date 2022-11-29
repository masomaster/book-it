import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

import NavBar from '../../components/NavBar/NavBar';
import Home from '../Home/Home';
import AuthPage from "../AuthPage/AuthPage";
import BookList from '../BookList/BookList';
import BookshelfList from '../BookshelfList/BookshelfList';
import NewBook from '../NewBook/NewBook';
import BookDetailPage from '../BookDetailPage/BookDetailPage';
import BookshelfDetailPage from '../BookshelfDetailPage/BookshelfDetailPage';

import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [library, setLibrary] = useState([])
  const [bookshelves, setBookshelves] = useState([])

  useEffect(function() {
    (async function getLibrary(){
      const books = await booksAPI.getLibrary();
      setLibrary(books);
    })();
  }, [])

  useEffect(function() {
    (async function getBookshelves(){
        const bookshelfSet = await bookshelvesAPI.getBookshelves();
        setBookshelves(bookshelfSet);
    })();
  }, [])

  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user = {user} setUser = {setUser}/>
          <Routes>
            <Route path="/" element={<Home user = {user} library={library}/>} />
            <Route path="/books" element={<BookList user={user} library={library} setLibrary={setLibrary}/>} />
            <Route path="/books/new" element={<NewBook user={user}/>} />
            <Route path="/books/:bookId" element={<BookDetailPage library={library}/>} />
            <Route path="/bookshelves" element={<BookshelfList user={user} bookshelves={bookshelves} setBookshelves={setBookshelves}/>} />
            <Route path="/bookshelves/:bookshelfId" element={<BookshelfDetailPage bookshelves={bookshelves}/>} />
          </Routes>
        </>
          :
        <AuthPage setUser = {setUser}/>
      }
    </main>
  );
}