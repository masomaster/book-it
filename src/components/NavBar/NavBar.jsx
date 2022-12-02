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
        <nav>
            <div>
                <Link to='/' className="book-it"><span className="book-it large">BookIt!</span></Link>
            </div>
            <div className="other-links">
                <Link to='/books' className="nav-links">Books</Link>
                <Link to='/bookshelves' className="nav-links">Bookshelves</Link>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
        </nav>
    );
}