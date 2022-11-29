import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

import * as booksAPI from '../../utilities/books-api';
import NavBar from '../../components/NavBar/NavBar';
import Home from '../Home/Home';
import AuthPage from "../AuthPage/AuthPage";
import BookList from '../BookList/BookList';
import BookshelfList from '../BookshelfList/BookshelfList';
import NewBook from '../NewBook/NewBook';
import BookDetailPage from '../BookDetailPage/BookDetailPage';

import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [library, setLibrary] = useState([])

  useEffect(function() {
    (async function getLibrary(){
      const books = await booksAPI.getLibrary();
      setLibrary(books);
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
            <Route path="/bookshelves" element={<BookshelfList user={user}/>} />
          </Routes>
        </>
          :
        <AuthPage setUser = {setUser}/>
      }
    </main>
  );
}