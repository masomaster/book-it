import { useState } from "react";
import * as bookshelvesAPI from '../../utilities/bookshelves-api';
import '../Sidebar/Sidebar.css';

export default function NewBookshelfForm({ user, bookshelves, setBookshelves }) {
    const [newBookshelfForm, setNewBookshelfForm] = useState({
        title: '',
        description: '',
        pinned: false,
    });

    function handleChange(evt) {
        const newFormData = { ...newBookshelfForm, [evt.target.name]: evt.target.value, error: ''}
        setNewBookshelfForm(newFormData);
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formDataCopy = {...newBookshelfForm};
            if (formDataCopy.pinned === "Yes") formDataCopy.pinned = true;
            formDataCopy.user = user._id;
            console.log(formDataCopy)
            
            const newBookshelf = await bookshelvesAPI.addBookshelf(formDataCopy);
            setBookshelves([...bookshelves, newBookshelf])
            setNewBookshelfForm({
                title: '',
                description: '',
                pinned: false,
            })
        } catch {
            setNewBookshelfForm({
                ...newBookshelfForm, 
                error: 'Invalid Entry - Correct Red Entries'});
        }
    }
    
    return (
        <div>
            <div className="new-bookshelf-form">
                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" required value={newBookshelfForm.title} onChange={handleChange}/>
                    <label>Description</label>
                    <textarea rows="3" cols="16" name="description" value={newBookshelfForm.description} onChange={handleChange}/>
                    <label>Pin to Prioritize?</label>
                    <select name="pinned" value={newBookshelfForm.pinned} onChange={handleChange}>
                        <option>No</option>
                        <option>Yes</option>
                    </select><br />
                    <input type="submit" className="btn" value="Add Bookshelf" />
                </form>
                <p className="error-message">&nbsp;{newBookshelfForm.error}</p>
            </div>
        </div>
    )
}