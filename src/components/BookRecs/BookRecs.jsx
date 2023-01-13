import { useState } from "react";
import Select from 'react-select';
import * as booksAPI from '../../utilities/books-api';

export default function BookRecs({ library }) {
    const [bookChoices, setBookChoices] = useState()
    const [message, setMessage] = useState()
    const bookOptions = library?.map(b => {return {value: b._id, label: `${b.title} by ${b.authors[0]}`}});

    function handleChoices(choices) {
        if (choices.length) {
            setMessage(null)
            setBookChoices(choices);
        }
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        if (bookChoices) {
            try {
                setMessage("Oooo great choices! Hm... Let me think about that for a moment...")
                const likedBooks = [...bookChoices];
                const likedBooksString = likedBooks.map(b => b.label).join(', and ')
                const query = `If I liked the book ${likedBooksString} what other books might I like reading?`
                console.log({query})
                const recommendations = await booksAPI.getRecs(query);
                console.log({recommendations});
                setMessage(recommendations);
            } catch(err) {
                console.log(err)
            }
        } else {
            setMessage("Select at least one book to get recommendations!")
        }
    }

    return (
        <div className="ai-instructions">
            <p className="alt-instructions-text">Not sure what to read next? Get AI recommendations! Select up to three books you liked:</p><br />
            <form className="ai-form" onSubmit={handleSubmit}>
                <Select
                    name="likedBooks"
                    isMulti
                    options={bookOptions}
                    onChange={handleChoices}
                />
                <input type="submit" className="button-primary" value="Tell Me What to Read!" />
            </form>
            <p className="message">&nbsp;{message}</p>
        </div>
    )
}