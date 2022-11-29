import NextUp from "../../components/NextUp/NextUp";
import CurrentlyReading from "../../components/CurrentlyReading/CurrentlyReading";
import HighlightedBookshelf from "../../components/HighlightedBookshelf/HighlightedBookshelf";
import ReadingStats from "../../components/ReadingStats/ReadingStats";
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

export default function Home({ user, library }) {
    
    return (
        <div className="content">
            <div className="summary-pane">
                <NextUp />
                <CurrentlyReading />
                <HighlightedBookshelf />
                <ReadingStats user={user} library={library}/>
            </div>
            {/* <Sidebar user = {user}/> */}
        </div>
    )
}