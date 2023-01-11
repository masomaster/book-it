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
        this.createBookshelfAndAddBook(userId, newBookId, newBookshelfTitles)
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
    // find bookshelves that should include book but don't, then add
    const bookshelvesShouldHaveBookButDont = await bookshelfModel.find({
        '_id': { $in: bookshelfIds},
        'books': { $nin: [bookId]}
    })
    bookshelvesShouldHaveBookButDont.forEach(function(s) {
        s.books.push(bookId)
        s.save();
    })

    // find bookshelves that include book but shouldn't, then remove
    const bookshelvesShouldNotHaveBookButDo = await bookshelfModel.find({
        '_id': { $nin: bookshelfIds},
        'books': { $in: [bookId]}
    })
    bookshelvesShouldNotHaveBookButDo.forEach(function(s) {
        s.books.splice(s.books.indexOf(bookId), 1)
        s.save();
    })

    // create any new bookshelves (if applicable)
    this.createBookshelfAndAddBook(userId, bookId, newBookshelfTitles);
    
    return bookshelfModel.getBookshelves(userId);
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