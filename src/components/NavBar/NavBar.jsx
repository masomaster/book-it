import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({user, setUser}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    
    return (
        <nav>
            <div>
                <Link to='/' className="book-it"><span className="book-it large">BookIt!</span></Link>
            </div>
            <div>
                <Link to='/books' className="nav-links">Books</Link>
                <Link to='/bookshelves' className="nav-links">Bookshelves</Link>
                <Link to="" className="nav-links" onClick={handleLogOut}><button>Log Out</button></Link>
            </div>
        </nav>
    );
}