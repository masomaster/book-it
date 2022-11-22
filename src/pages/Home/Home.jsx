import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

export default function Home({ user }) {
    return (
        <div className="content home">
            <div className="summary-pane">
                <p>This is the summary pane</p>
            </div>
            <Sidebar user = {user}/>
        </div>
    )
}