import { useState, useEffect, useRef } from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import * as booksAPI from '../../utilities/books-api';
import * as bookshelvesAPI from '../../utilities/bookshelves-api';
import './EditBookForm.css';

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
        feeling: '',
        pinned: false,
        notes: '',
        done: false,
        owned: true,
        error: '',
        user: '',
        img: '',
    });

    useEffect(function() {
        setFormData({
            title: book.title || '',
            authors: book.authors || '',
            pubYear: book.pubYear || '',
            publisher: book.publisher || '',
            totalPages: book.totalPages || '',
            pagesRead: book.pagesRead || '',
            category: book.category || '',
            url: book.url || '',
            description: book.description || '',
            course: book.course || '',
            dueDate: book.dueDate ? book.dueDate : '',
            feeling: book.feeling || '',
            pinned: book.pinned,
            notes: book.notes || '',
            done: book.done,
            owned: book.owned,
            error: '',
            user: book.user,
            img: book.img || '',
        })
    }, [book])
    
    // Variables needed for react-select
    const bookshelfOptions = bookshelves?.map(b => {return {value: b._id, label: b.title}});
    const shelfPreset = bookshelves.filter(s => shelvesInclBook.includes(s.title)).flatMap(s => [{"value": s._id, "label": s.title}])
    const booleanOptions = [
        {value: false, label: 'No'},
        {value: true, label: 'Yes'}
    ]
    const animatedComponents = makeAnimated();
    const bookshelfSelect = useRef();
    const pinnedSelect = useRef();
    const ownedSelect = useRef();

    // Functions to handle various form changes
    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: evt.target.value, error: ''}
        setFormData(newFormData);
    };

    function handleBookshelfAdd(choices) {
        const newFormData = { ...formData, bookshelves: [], createdBookshelves: []}; 
        choices.forEach(function(c) {
            if (c.label === c.value) {
                newFormData.createdBookshelves.push(c.label)
            } else {
                newFormData.bookshelves.push(c.value);
            }
        })
        setFormData(newFormData);
    }

    function handlePinChange(choice) {
        const newFormData = { ...formData};
        newFormData.pinned = choice.value;
        setFormData(newFormData);
    }

    function handleOwnedChange(choice) {
        const newFormData = { ...formData};
        newFormData.owned = choice.value;
        setFormData(newFormData);
    }

    // Function to handle form submission
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const formDataCopy = {...formData};
            const updatedBook = await booksAPI.updateBook(book._id, formDataCopy);
            const newLibrary = library.filter(b => b._id !== updatedBook._id);
            newLibrary.push(updatedBook);
            setLibrary(newLibrary);

            if (formDataCopy.bookshelves) {
                const shelvesAndTitles = await bookshelvesAPI.updateBookshelvesContents(book._id, formDataCopy.bookshelves, formDataCopy.createdBookshelves);
                const updatedBookshelves = shelvesAndTitles[0];
                const bookshelfTitlesWithBook = shelvesAndTitles[1];
                setBookshelves(updatedBookshelves);
                setShelvesInclBook(bookshelfTitlesWithBook);
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

    return (
        <div className="edit-book-form">
            <div>
                <img src={book.img} alt="book cover"/>
            </div>
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
                <label>Feeling after reading (enter emoji)</label>
                <input type="text" name="feeling" value={formData.feeling} onChange={handleChange}/>
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
                <label>Add to Bookshelf</label>
                <CreatableSelect 
                    name="bookshelves" 
                    ref={bookshelfSelect}
                    options={bookshelfOptions} 
                    isMulti 
                    components={animatedComponents}
                    className="basic-multi-select" 
                    classNamePrefix="select" 
                    defaultValue={shelfPreset}
                    onChange={handleBookshelfAdd} />
                <br />
                <label>Pin to Prioritize?</label>
                <Select 
                    options={booleanOptions} 
                    ref={pinnedSelect}
                    defaultValue={booleanOptions[0]}
                    onChange={handlePinChange}
                />
                <br />
                <label>Owned?</label>
                <Select 
                    options={booleanOptions} 
                    ref={ownedSelect}
                    defaultValue={booleanOptions[1]}
                    onChange={handleOwnedChange}
                />
                <br />
                <label>Done?</label>
                <select name="done" value={formData.done} onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <input type="submit" className="button-primary" value="Update Book" />
            </form>
            <p className="error-message">&nbsp;{formData.error}</p>
        </div>
    )
}