import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as booksAPI from '../../utilities/books-api';

export default function NewBookForm({ user }) {
    const [newBookForm, setNewBookForm] = useState({
        title: '',
        authors: '',
        pubYear: '',
        publisher: '',
        totalPages: '',
        pagesRead: '',
        category: '',
        url: '',
        course: '',
        dueDate: '',
        pinned: false,
        notes: '',
        bookshelf: '',
        owned: true,
        error: '',
    });
    const navigate = useNavigate()

    function handleChange(evt) {
        const newFormData = { ...newBookForm, [evt.target.name]: evt.target.value, error: ''}
        setNewBookForm(newFormData);
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formDataCopy = {...newBookForm};
            if (formDataCopy.authors) formDataCopy.authors = formDataCopy.authors.split(',').map(function(str) {
                return str.trim();
            });
            if (formDataCopy.pinned === "Yes") formDataCopy.pinned = true;
            if (formDataCopy.owned === "No") formDataCopy.owned = false;
            if (formDataCopy.dueDate) formDataCopy.dueDate = new Date(formDataCopy.dueDate);
            if (!formDataCopy.bookshelf) formDataCopy.bookshelf = null;
            formDataCopy.user = user._id;

            await booksAPI.addBook(formDataCopy);
            
            navigate('/books');
        } catch {
            setNewBookForm({
                ...newBookForm, 
                error: 'Invalid Entry - Correct Red Entries'});
        }
    }
    
    return (
        <div className="book-form">
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" required value={newBookForm.title} onChange={handleChange}/>
                <label>Authors (separate by comma)</label>
                <input type="text" name="authors" value={newBookForm.authors} onChange={handleChange}/>
                <label>Year Published</label>
                <input type="text" name="pubYear" maxLength="4" pattern="\d{4}" value={newBookForm.pubYear} onChange={handleChange}/>
                <label>Publisher</label>
                <input type="text" name="publisher" value={newBookForm.publisher} onChange={handleChange}/>
                <label>Total Page Count</label>
                <input type="number" name="totalPages" value={newBookForm.totalPages} onChange={handleChange}/>
                <label>Pages Read</label>
                <input type="number" name="pagesRead" value={newBookForm.pagesRead} onChange={handleChange}/>
                <label>Category</label>
                <input type="text" name="category" value={newBookForm.category} onChange={handleChange}/>
                <label>Website</label>
                <input type="text" name="url" value={newBookForm.url} onChange={handleChange}/>
                <label>Course</label>
                <input type="text" name="course" value={newBookForm.course} onChange={handleChange}/>
                <label>Due Date</label>
                <input type="date" name="dueDate" value={newBookForm.dueDate} onChange={handleChange}/>
                <label>Notes</label>
                <textarea rows="3" cols="16" name="notes" value={newBookForm.notes} onChange={handleChange}/>
                <label>Pin to Prioritize?</label>
                <select name="pinned" value={newBookForm.priority} onChange={handleChange}>
                    <option>No</option>
                    <option>Yes</option>
                </select>
                <label>Add to Bookshelf</label>
                <select name="bookshelf" value={newBookForm.bookshelf} onChange={handleChange}>
                    <option></option>
                    <option>Placeholder</option>
                    <option>Other Placeholder</option>
                </select>
                <label>Owned?</label>
                <select name="owned" value={newBookForm.owned} onChange={handleChange}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <input type="submit" className="btn" value="Add Book" />
            </form>
            <p className="error-message">&nbsp;{newBookForm.error}</p>
        </div>
    )
}