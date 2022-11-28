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