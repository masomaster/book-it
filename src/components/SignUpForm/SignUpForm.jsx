import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { Link } from 'react-router-dom';

export default function SignUpForm({setUser, handleToggle}) {
    const [signUpForm, setSignUpForm] = useState({
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
    });

    function handleChange(evt) {
        const newFormData = { ...signUpForm, [evt.target.name]: evt.target.value, error: ''}
        setSignUpForm(newFormData);
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formDataCopy = {...signUpForm};
            delete formDataCopy.confirm;
            delete formDataCopy.error;
            // Or could do:
                // const {name, email, password} = formData;
                // const formDataCopy = {name, email, password};
            const user = await signUp(formDataCopy);
            setUser(user);
        } catch {
            setSignUpForm({
                ...signUpForm, 
                error: 'Sign Up Failed - Try Again'});
        }
    }

    const disable = signUpForm.password !== signUpForm.confirm;
    return (
        <div className="auth-page-form">
            <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={signUpForm.name} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={signUpForm.email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={signUpForm.password} onChange={handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={signUpForm.confirm} onChange={handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
            </form>
            </div>
            <p className="error-message">&nbsp;{signUpForm.error}</p>
            <Link to="" onClick={handleToggle}>Already have an account? Login here.</Link>
        </div>
    );     
}