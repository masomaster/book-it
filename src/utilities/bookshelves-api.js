import sendRequest from "./send-request";

const BASE_URL = '/api/bookshelves';

export async function getBookshelves() {
    return sendRequest(`${BASE_URL}/`);
}

export async function addBookshelf(newBookshelf) {
    return sendRequest(`${BASE_URL}/new`, 'POST', newBookshelf);
}