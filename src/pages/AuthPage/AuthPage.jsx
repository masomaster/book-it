import {Helmet} from "react-helmet";
import { useState } from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import AuthPageBrand from "../../components/AuthPageBrand/AuthPageBrand";

export default function AuthPage({setUser}) {
    const [login, setLogin] = useState(true)
    
    function handleToggle() {
        setLogin(!login);
    }

    return (
        <main className="auth-page">
            <Helmet>
                <link rel="stylesheet" href="AuthPage.css" />
            </Helmet>
            { login ? 
                <>
                    <AuthPageBrand />
                    <div>
                        <h1>Log In</h1>
                        <LoginForm setUser = {setUser} handleToggle={handleToggle} />
                    </div>
                </>
                :
                <>
                    <AuthPageBrand />
                    <div>
                        <h1>Sign Up</h1>
                        <SignUpForm setUser = {setUser} handleToggle={handleToggle} />
                    </div>
                </>
            }
        </main>
    )
}