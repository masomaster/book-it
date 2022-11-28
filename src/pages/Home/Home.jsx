import NextUp from "../../components/NextUp/NextUp";
import CurrentlyReading from "../../components/CurrentlyReading/CurrentlyReading";
import HighlightedBookshelf from "../../components/HighlightedBookshelf/HighlightedBookshelf";
import ReadingStats from "../../components/ReadingStats/ReadingStats";
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

export default function Home({ user }) {
    
    return (
        <div className="content home">
            <div className="home">
                <NextUp user = {user}/>
                <CurrentlyReading />
                <HighlightedBookshelf />
                <ReadingStats />
            </div>
            <Sidebar user = {user}/>
        </div>
    )
}