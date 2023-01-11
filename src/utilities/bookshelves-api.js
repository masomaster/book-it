import sendRequest from "./send-request";

const BASE_URL = '/api/bookshelves';

export async function getBookshelves() {
    return sendRequest(`${BASE_URL}/`);
}

export async function addBookshelf(newBookshelf) {
    return sendRequest(`${BASE_URL}/new`, 'POST', newBookshelf);
}

export async function getHighlightedBookshelf() {
    return sendRequest(`${BASE_URL}/highlighted`);
}

export async function addBook(newBookId, bookshelfIds, newBookshelves) {
    return sendRequest(`${BASE_URL}/addbook`, 'POST', {newBookId, bookshelfIds, newBookshelves});
}

export async function updateBookshelf(bookshelfId, newBookshelfInfo) {
    return sendRequest(`${BASE_URL}/updatebookshelf`, 'POST', {bookshelfId, newBookshelfInfo});
}

export async function updateBookshelvesContents(bookId, bookshelfIds, newBookshelfTitle) {
    return sendRequest(`${BASE_URL}/updatebookshelvescontents`, 'POST', {bookId, bookshelfIds, newBookshelfTitle});
}

export async function deleteBookshelf(bookshelfId) {
    return sendRequest(`${BASE_URL}/deletebookshelf/${bookshelfId}`, 'DELETE');
}