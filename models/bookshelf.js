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

bookshelfSchema.statics.addBook = async function(userId, newBookId, bookshelfIds, newBookshelves) {
    const bookModel = this;
    async function addToShelves(userId, newBookId, bookshelfIds, newBookshelves) {
        if (newBookshelves?.length) {
            for (b of newBookshelves) {
                const newShelf = await bookModel.create({
                    title: b,
                    user: userId
                });
                console.log(newShelf)
                newShelf.books.push(newBookId);
                newShelf.save();
                console.log({bookshelf})
            }
        }
        if (bookshelfIds?.length) {
            for (b of bookshelfIds) {
                const bookshelf = await bookModel.findOne({
                    user: userId,
                    _id: b
                });
                bookshelf.books.push(newBookId)
                bookshelf.save();
                console.log({bookshelf})
            }
        }
    }
    async function returnNewShelves(userId) {
        const newBookshelfList = await bookModel.getBookshelves(userId);
        console.log({newBookshelfList})
        return newBookshelfList;
    }
    await addToShelves(userId, newBookId, bookshelfIds, newBookshelves);
    return await returnNewShelves(userId);
}

module.exports = mongoose.model('Bookshelf', bookshelfSchema);