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
    if (newBookshelves?.length) {
        for (b of newBookshelves) {
            const newShelf = await this.create({
                title: b,
                user: userId
            });
            console.log(newShelf)
            newShelf.books.push(newBookId);
            newShelf.save();
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
        }
    }
    const newBookshelfList = this.getBookshelves(userId);
    return newBookshelfList;
}

module.exports = mongoose.model('Bookshelf', bookshelfSchema);