import { useState, useEffect } from "react";
import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

export default function EditBookForm({ book, library, setLibrary, bookshelves, setBookshelves, setEditToggle, shelvesInclBook, setShelvesInclBook }) {
    const [formData, setFormData] = useState({
        title: '',
        authors: '',
        pubYear: '',
        publisher: '',
        totalPages: '',
        pagesRead: '',
        category: '',
        url: '',
        description: '',
        course: '',
        dueDate: book.dueDate ? book.dueDate : '',
        pinned: false,
        notes: '',
        bookshelf: '',
        done: false,
        owned: true,
        error: '',
        user: '',
        img: '',
    });

    useEffect(function() {
        setFormData({
            title: book.title,
            authors: book.authors,
            pubYear: book.pubYear,
            publisher: book.publisher,
            totalPages: book.totalPages,
            pagesRead: book.pagesRead,
            category: book.category,
            url: book.url,
            description: book.description,
            course: book.course,
            dueDate: book.dueDate ? book.dueDate : '',
            pinned: book.pinned,
            notes: book.notes,
            bookshelf: '',
            done: book.done,
            owned: book.owned,
            error: book.error,
            img: book.img,
        })
    }, [book])
    
    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value, error: ''}
        setFormData(newFormData);
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formDataCopy = {...formData};
            const updatedBook = await booksAPI.updateBook(book._id, formDataCopy);
            const newLibrary = library.filter(b => b._id !== updatedBook._id);
            newLibrary.push(updatedBook);
            setLibrary(newLibrary);

            if (formDataCopy.bookshelf) {
                const bookshelf = await bookshelvesAPI.addBook(book._id, formDataCopy.bookshelf);
                setShelvesInclBook([...shelvesInclBook, bookshelf.title]);
            }

            setFormData({
                title: book.title,
                authors: book.authors,
                pubYear: book.pubYear,
                publisher: book.publisher,
                totalPages: book.totalPages,
                pagesRead: book.pagesRead,
                category: book.category,
                url: book.url,
                description: book.description,
                course: book.course,
                dueDate: book.dueDate ? book.dueDate : '',
                pinned: book.pinned,
                notes: book.notes,
                bookshelf: book.bookshelf ? book.bookshelf : '',
                done: book.done,
                owned: book.owned,
                error: book.error,
                img: book.img,
            })
            setEditToggle(false)
        } catch(err) {
            console.log(err)
            setFormData({
                ...formData, 
                error: 'Invalid Entry - Correct Entries'});
        }
    }

    console.log(formData)
    return (
        <div className="book-form">
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange}/>
                <label>Authors (separate by comma)</label>
                <input type="text" name="authors" value={formData.authors} onChange={handleChange}/>
                <label>Year Published</label>
                <input type="text" name="pubYear" maxLength="4" pattern="\d{4}" value={formData.pubYear} onChange={handleChange}/>
                <label>Publisher</label>
                <input type="text" name="publisher" value={formData.publisher} onChange={handleChange}/>
                <label>Total Page Count</label>
                <input type="number" name="totalPages" value={formData.totalPages} onChange={handleChange}/>
                <label>Pages Read</label>
                <input type="number" name="pagesRead" value={formData.pagesRead} onChange={handleChange}/>
                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange}/>
                <label>Website</label>
                <input type="text" name="url" value={formData.url} onChange={handleChange}/>
                <label>Description</label>
                <textarea rows="3" cols="16" name="description" value={formData.description} onChange={handleChange}/>
                <label>Course</label>
                <input type="text" name="course" value={formData.course} onChange={handleChange}/>
                <label>Due Date</label>
                <input type="date" name="dueDate" /* ADD BACK IN ONCE FEATURE IMPLEMENTED value={formData.dueDate} */ onChange={handleChange}/>
                <label>Notes</label>
                <textarea rows="3" cols="16" name="notes" value={formData.notes} onChange={handleChange}/>
                <label>Pin to Prioritize?</label>
                <select name="pinned" value={formData.pinned} onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label>Add to Bookshelf</label>
                <select name="bookshelf" value={formData.bookshelf} onChange={handleChange}>
                    <option value={''}></option>
                    {bookshelves?.map(b => <option key={b._id} value={b._id}>{b.title}</option>)}
                </select>
                <label>Done?</label>
                <select name="done" value={formData.done} onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label>Owned?</label>
                <select name="owned" value={formData.owned} onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select><br />
                <input type="submit" className="btn" value="Update Book" />
            </form>
            <p className="error-message">&nbsp;{formData.error}</p>
        </div>
    )
}