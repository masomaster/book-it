import NewBookForm from '../NewBookForm/NewBookForm';
import './Sidebar.css';

export default function Sidebar({ user, bookshelves, library }) {
    return (
        <aside>
            <p>This is the sidebar</p>
            
            { true ?
                <NewBookForm />
                :
                <div>asdf</div>
            }
        </aside>
    )
}