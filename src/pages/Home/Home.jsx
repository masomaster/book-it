import NextUp from "../../components/NextUp/NextUp";
import CurrentlyReading from "../../components/CurrentlyReading/CurrentlyReading";
import HighlightedBookshelf from "../../components/HighlightedBookshelf/HighlightedBookshelf";
import ReadingStats from "../../components/ReadingStats/ReadingStats";
import './Home.css';

export default function Home({ user, library }) {

    return (
        <>
            <div className="home">
                <div>
                    <h2 className="section-title">Welcome to your Reading Dashboard, {user.name}!</h2>
                    <div className="dashboard">
                        <ReadingStats user={user} library={library}/>
                        <NextUp />
                    </div>
                </div>
                <CurrentlyReading />
                <HighlightedBookshelf />
            </div>
        </>
    )
}