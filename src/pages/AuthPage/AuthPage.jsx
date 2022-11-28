import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from 'react';
import "./AuthPage.css";

export default function AuthPage({setUser}) {
    const [login, setLogin] = useState(true)
    
    function handleToggle() {
        setLogin(!login);
    }

    return (
        <main className="auth-page">
            { login ? 
                <>
                    <h1>Log In</h1>
                    <LoginForm setUser = {setUser} handleToggle={handleToggle} />
                </>
                :
                <>
                    <h1>Sign Up</h1>
                    <SignUpForm setUser = {setUser} handleToggle={handleToggle} />
                </>
            }
        </main>
    )
}