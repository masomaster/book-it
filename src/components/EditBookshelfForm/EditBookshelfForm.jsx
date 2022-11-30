import { useState, useEffect } from "react";
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

export default function EditBookshelfForm({bookshelf, bookshelves, setBookshelves, setEditToggle}) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pinned: false,
    });
    
    useEffect(function() {
        setFormData({
            title: bookshelf.title,
            description: bookshelf.description,
            pinned: bookshelf.pinned,
        })
    }, [bookshelf])

    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value, error: ''}
        setFormData(newFormData);
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formDataCopy = {...formData};
            if (formDataCopy.pinned === "Yes") formDataCopy.pinned = true;
            const updatedBookshelf = await bookshelvesAPI.updateBookshelf(bookshelf._id, formDataCopy);
            const newBookshelves = bookshelves.filter(b => b._id !== updatedBookshelf._id);
            newBookshelves.push(updatedBookshelf);
            setBookshelves(newBookshelves);

            setFormData({
                title: bookshelf.title,
                description: bookshelf.description,
                pinned: bookshelf.pinned,
            })
            setEditToggle(false)
        } catch(err) {
            console.log(err)
            setFormData({
                ...formData, 
                error: 'Invalid Entry - Correct Red Entries'});
        }
    }
    
    return (
        <div className="edit-bookshelf-form">
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange}/>
                <label>Description</label>
                <textarea rows="3" cols="16" name="description" value={formData.description} onChange={handleChange}/>
                <label>Pin to Prioritize?</label>
                <select name="pinned" onChange={handleChange}>
                    <option value="no">No</option>
                    {formData.pinned ? 
                        <option selected>Yes</option>
                    :
                        <option >Yes</option>
                    }
                </select><br />
                <input type="submit" className="btn" value="Update Bookshelf" />
                <button>Delete</button>
            </form>
            <p className="error-message">&nbsp;{formData.error}</p>
        </div>
    )
}