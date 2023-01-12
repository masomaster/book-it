const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookshelfSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    pinned: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    books: [{type: Schema.Types.ObjectId, ref: "Book"}]
}, {
    timestamps: true,
})

bookshelfSchema.statics.getBookshelves = function(userId) {
    return this.find({user: userId}).sort({"title":1}).populate('books');
}

bookshelfSchema.statics.getHighlightedBookshelf = function(userId) {
    return this.findOne({
        user: userId,
        pinned: true
    })
}

bookshelfSchema.statics.addBook = async function(userId, newBookId, bookshelfIds, newBookshelfTitles) {
    const bookshelfModel = this;
    async function addToShelves(userId, newBookId, bookshelfIds, newBookshelfTitles) {
        bookshelfModel.createBookshelfAndAddBook(userId, newBookId, newBookshelfTitles)
        if (bookshelfIds?.length) {
            for (b of bookshelfIds) {
                const bookshelf = await bookshelfModel.findOne({
                    user: userId,
                    _id: b
                });
                bookshelf.books.push(newBookId)
                bookshelf.save();
            }
        }
    }
    async function returnNewShelves(userId) {
        const newBookshelfList = await bookshelfModel.getBookshelves(userId);
        return newBookshelfList;
    }
    await addToShelves(userId, newBookId, bookshelfIds, newBookshelfTitles);
    return await returnNewShelves(userId);
}

bookshelfSchema.statics.updateBookshelvesContents = async function(userId, bookId, bookshelfIds, newBookshelfTitles) {
    const bookshelfModel = this;
    
    // Finds bookshelves that should include book but don't, then add
    const bookshelvesShouldHaveBookButDont = await bookshelfModel.find({
        'user': userId,
        '_id': { $in: bookshelfIds},
        'books': { $nin: [bookId]}
    })
    bookshelvesShouldHaveBookButDont.forEach(function(s) {
        s.books.push(bookId)
        s.save();
    })

    // Finds bookshelves that include book but shouldn't, then remove
    const bookshelvesShouldNotHaveBookButDo = await bookshelfModel.find({
        'user': userId,
        '_id': { $nin: bookshelfIds},
        'books': { $in: [bookId]}
    })
    bookshelvesShouldNotHaveBookButDo.forEach(function(s) {
        s.books.splice(s.books.indexOf(bookId), 1)
        s.save();
    })

    // Creates any new bookshelves (if applicable)
    bookshelfModel.createBookshelfAndAddBook(userId, bookId, newBookshelfTitles);
    
    // Formats return info
    const bookshelves = await bookshelfModel.getBookshelves(userId)
    const bookshelvesWithBook = await bookshelfModel.find({
        'user': userId,
        'books': { $in: [bookId]}
    })
    const bookshelfTitlesWithBook = bookshelvesWithBook.map(b => b.title);
    console.log(bookshelfTitlesWithBook);
    const shelvesAndTitles = [bookshelves, bookshelfTitlesWithBook]
    return shelvesAndTitles;
}

bookshelfSchema.statics.createBookshelfAndAddBook = async function (userId, newBookId, newBookshelfTitles) {
    const bookshelfModel = this;
    if (newBookshelfTitles?.length) {
        for (b of newBookshelfTitles) {
            const newShelf = await bookshelfModel.create({
                title: b,
                user: userId
            });
            newShelf.books.push(newBookId);
            newShelf.save();
        }
    }
}
module.exports = mongoose.model('Bookshelf', bookshelfSchema);