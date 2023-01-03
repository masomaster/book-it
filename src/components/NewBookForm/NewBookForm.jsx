import { useState, useEffect, useRef } from "react";
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';

export default function NewBookForm({ user, library, setLibrary, selectedBook, setSelectedBook, bookshelves, setBookshelves, shelvesInclBook, setShelvesInclBook, scrollToForm, handlePopulateForm }) {
    const initialFormState = {
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
        bookshelves: [],
        error: '',
        user: '',
        img: '',
    }
    const [newBookForm, setNewBookForm] = useState(initialFormState);
    const [pinned, setPinned] = useState(false);
    const [owned, setOwned] = useState(true);


    // Variables needed for react-select
    const bookshelfOptions = bookshelves?.map(b => {return {value: b._id, label: b.title}});
    const booleanOptions = [
        {value: false, label: 'No'},
        {value: true, label: 'Yes'}
    ]
    const animatedComponents = makeAnimated();
    const bookshelfSelect = useRef();

    // Adds selected book info to NewBookForm
    useEffect(function() {
        if (selectedBook) {
            bookshelfSelect.current.clearValue();
            setNewBookForm(selectedBook)
        }
        else {
            setNewBookForm(initialFormState)
        }
    }, [handlePopulateForm, selectedBook])

    // Handles form changes
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

    // Handles form submission
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
            const newLibrary = [...library]
            newLibrary.push(newBook);
            setLibrary(newLibrary);

            if (formDataCopy.bookshelves) {
                const updatedBookshelves = await bookshelvesAPI.addBook(newBook._id, formDataCopy.bookshelves, formDataCopy.createdBookshelves);
                setBookshelves(updatedBookshelves);
            }
            
            setSelectedBook(null);
        } catch(err) {
            console.log(err)
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
                <label>Add to Bookshelf</label>
                <CreatableSelect 
                    name="bookshelves" 
                    ref={bookshelfSelect}
                    options={bookshelfOptions} 
                    isMulti 
                    components={animatedComponents}
                    className="basic-multi-select" 
                    classNamePrefix="select" 
                    onChange={handleBookshelfAdd} />
                <br />
                <label>Pin to Prioritize?</label>
                {/* <input type="checkbox" /> */}
                {/* <Select 
                    options={booleanOptions} 
                    defaultValue={booleanOptions[0]}
                />
                <br /> */}
                <select name="pinned" value={newBookForm.pinned} onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <label>Owned?</label>
                {/* <Select 
                    options={booleanOptions} 
                    defaultValue={booleanOptions[1]}
                />
                <br /> */}
                <select name="owned" value={newBookForm.owned} onChange={handleChange}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <br />
                <input type="submit" className="button-primary" value="Add Book" />
            </form>
            <p className="error-message">&nbsp;{newBookForm.error}</p>
        </div>
    )
}