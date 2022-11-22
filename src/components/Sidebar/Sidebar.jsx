import NewBookForm from '../NewBookForm/NewBookForm';
import './Sidebar.css';

export default function Sidebar({ user }) {
    return (
        <aside>
            <p>This is the sidebar</p>
            <NewBookForm user = {user}/>
        </aside>
    )
}