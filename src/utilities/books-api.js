import sendRequest from "./send-request";

const BASE_URL = '/api/books';

export async function addBook(newBook) {
    return sendRequest(`${BASE_URL}/new`, 'POST', newBook);
}

export async function getLibrary() {
    return sendRequest(`${BASE_URL}/`);
}

export async function getNextUp() {
    return sendRequest(`${BASE_URL}/next`)
}

export async function getInProgressBooks() {
    return sendRequest(`${BASE_URL}/current`)
}

export async function getBooksRead() {
    return sendRequest(`${BASE_URL}/totalbooks`)
}

export async function deleteBookshelf(bookId) {
    return sendRequest(`${BASE_URL}/deletebook/${bookId}`, 'DELETE')
}

export async function updateBook(bookId, newBookInfo) {
    return sendRequest(`${BASE_URL}/updatebook`, 'POST', {bookId, newBookInfo});
}

export async function getRecs(query) {
    return sendRequest(`${BASE_URL}/getrecs`, 'POST', {query});
}