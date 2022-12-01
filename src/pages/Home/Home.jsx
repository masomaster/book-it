import NextUp from "../../components/NextUp/NextUp";
import CurrentlyReading from "../../components/CurrentlyReading/CurrentlyReading";
import HighlightedBookshelf from "../../components/HighlightedBookshelf/HighlightedBookshelf";
import ReadingStats from "../../components/ReadingStats/ReadingStats";
import './Home.css';

export default function Home({ user, library }) {

    return (
        <>
            <div className="home">
                <NextUp />
                <ReadingStats user={user} library={library}/>
                <CurrentlyReading />
                <HighlightedBookshelf />
            </div>
        </>
    )
}