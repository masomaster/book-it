import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({user, setUser}) {
    const [open , setOpen] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (!open){
            document.getElementById("menu-toggle").click()
        }
    },[open]);

    function handleLogOut() {
        setOpen(false);
        userService.logOut();
        setUser(null);
        navigate('/');
    }
    
    return (
        <nav className="top-nav">
            <div>
                <Link to='/' className="book-it"><span className="book-it large" id="title">BookIt!</span></Link>
            </div>
            <input id="menu-toggle" type="checkbox" />
            <label className='menu-button-container' htmlFor="menu-toggle" onClick={()=> setOpen(true)}>
                <div className='menu-button'></div>
            </label>
            <ul className="menu">
                <li><Link to='/books' className="nav-links" onClick={()=> setOpen(false)}>Books</Link></li>
                <li><Link to='/bookshelves' className="nav-links" onClick={()=> setOpen(false)}>Bookshelves</Link></li>
                <li><Link to="" className="nav-links" onClick={handleLogOut}>Log Out</Link></li>
            </ul>
        </nav>
    );
}