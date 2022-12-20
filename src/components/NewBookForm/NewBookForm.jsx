import { useState, useEffect } from "react";
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';


export default function NewBookForm({ user, library, setLibrary, selectedBook, bookshelves, setBookshelves, shelvesInclBook, setShelvesInclBook, scrollToForm, handlePopulateForm }) {
    const [newBookForm, setNewBookForm] = useState({
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
        dueDate: '',
        pinned: false,
        notes: '',
        owned: true,
        error: '',
        user: '',
        img: '',
    });

    // Variables needed for react-select
    const bookshelfOptions = bookshelves?.map(b => {return {value: b._id, label: b.title}});
    const animatedComponents = makeAnimated();

    useEffect(function() {
        if (selectedBook) {
            setNewBookForm(selectedBook)
        }
    }, [handlePopulateForm, selectedBook])

    function handleChange(evt) {
        const newFormData = { ...newBookForm, [evt.target.name]: evt.target.value, error: ''}
        setNewBookForm(newFormData);
    };

    function handleBookshelfAdd(choices) {
        const newFormData = { ...newBookForm, bookshelves: [], createdBookshelves: []}; 
        choices.forEach(function(c) {
            if (c.label === c.value) {
                newFormData.createdBookshelves.push(c.label)
            } else {
                newFormData.bookshelves.push(c.value);
            }
        })
        setNewBookForm(newFormData);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formDataCopy = {...newBookForm};
            if (formDataCopy.authors) formDataCopy.authors = formDataCopy.authors.split(',').map(function(str) {
                return str.trim();
            });
            if (formDataCopy.dueDate) formDataCopy.dueDate = new Date(formDataCopy.dueDate);
            formDataCopy.user = user._id;
            const newBook = await booksAPI.addBook(formDataCopy);

            if (formDataCopy.bookshelves) {
                const updatedBookshelves = await bookshelvesAPI.addBook(newBook._id, formDataCopy.bookshelves, formDataCopy.createdBookshelves);
                setBookshelves(updatedBookshelves);
            }

            library.push(newBook);
            setLibrary(library);

            setNewBookForm({
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
                dueDate: '',
                pinned: false,
                notes: '',
                owned: true,
                error: '',
                user: '',
                img: '',
            })
        } catch {
            setNewBookForm({
                ...newBookForm, 
                error: 'Invalid Entry - Correct Entries'
            });
        }
    }
    
    return (
        <div className="book-form" ref={scrollToForm}>
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
                <label>Description</label>
                <textarea rows="3" cols="16" name="description" value={newBookForm.description} onChange={handleChange}/>
                <label>Course</label>
                <input type="text" name="course" value={newBookForm.course} onChange={handleChange}/>
                <label>Due Date</label>
                <input type="date" name="dueDate" value={newBookForm.dueDate} onChange={handleChange}/>
                <label>Notes</label>
                <textarea rows="3" cols="16" name="notes" value={newBookForm.notes} onChange={handleChange}/>
                <label>Pin to Prioritize?</label>
                <select name="pinned" value={newBookForm.pinned} onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label>Add to Bookshelf</label>
                <CreatableSelect 
                    name="bookshelves" 
                    options={bookshelfOptions} 
                    isMulti 
                    components={animatedComponents}
                    className="basic-multi-select" 
                    classNamePrefix="select" 
                    // onCreateOption={handleCreateBookshelves}
                    onChange={handleBookshelfAdd} />
                <label>Owned?</label>
                <select name="owned" value={newBookForm.owned} onChange={handleChange}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select><br />
                <input type="submit"  className="button-primary" value="Add Book" />
            </form>
            <p className="error-message">&nbsp;{newBookForm.error}</p>
        </div>
    )
}