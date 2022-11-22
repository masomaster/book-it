import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

import NavBar from '../../components/NavBar/NavBar';
import AuthPage from "../AuthPage/AuthPage";
import Content from '../Content/Content';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user = {user} setUser = {setUser}/>
          <Routes>
            {/* <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} /> */}
          </Routes>
          <Content />
        </>
          :
        <AuthPage setUser = {setUser}/>
      }
    </main>
  );
}