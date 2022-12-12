import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({user, setUser}) {
    const navigate = useNavigate();

    function handleLogOut() {
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
            <label class='menu-button-container' for="menu-toggle">
                <div class='menu-button'></div>
            </label>
            <ul className="menu">
                <li><Link to='/books' className="nav-links">Books</Link></li>
                <li><Link to='/bookshelves' className="nav-links">Bookshelves</Link></li>
                <li><Link to="" className="nav-links" onClick={handleLogOut}>Log Out</Link></li>
            </ul>
        </nav>
    );
}