import { useState } from 'react';
import { getUser } from '../../utilities/users-service';

import Provider from '../Provider/Provider';
import AuthPage from "../AuthPage/AuthPage";
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ? 
        <Provider user = {user} setUser = {setUser}/>  
        :
        <AuthPage setUser = {setUser}/>
      }
    </main>
  );
}