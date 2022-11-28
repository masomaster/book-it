import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

import NavBar from '../../components/NavBar/NavBar';
import Home from '../Home/Home';
import AuthPage from "../AuthPage/AuthPage";
import BookList from '../BookList/BookList';
import BookshelfList from '../BookshelfList/BookshelfList';

// import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  console.log('user', user)
  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user = {user} setUser = {setUser}/>
          <Routes>
            <Route path="/" element={<Home user = {user}/>} />
            <Route path="/books" element={<BookList user = {user}/>} />
            <Route path="/bookshelves" element={<BookshelfList user = {user}/>} />
          </Routes>
        </>
          :
        <AuthPage setUser = {setUser}/>
      }
    </main>
  );
}