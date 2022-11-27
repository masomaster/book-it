import NewBookForm from '../NewBookForm/NewBookForm';
import './Sidebar.css';

export default function Sidebar({ user, bookshelves, library, selectedBook, handlePopulateForm }) {
    return (
        <aside>
            <p>This is the sidebar</p>
            
            { true ?
                <NewBookForm user={user} selectedBook={selectedBook} handlePopulateForm={handlePopulateForm}/>
                :
                <div>asdf</div>
            }
        </aside>
    )
}