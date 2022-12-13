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
    return this.find({user: userId}).sort({"title":1});
}

bookshelfSchema.statics.getHighlightedBookshelf = function(userId) {
    return this.findOne({
        user: userId,
        pinned: true
    })
}

bookshelfSchema.statics.addBook = async function(userId, bookshelfId, newBookId) {
    const bookshelf = await this.findOne({
        user: userId,
        _id: bookshelfId
    });
    bookshelf.books.push(newBookId)
    bookshelf.save();
    return bookshelf.populate('books');
}

module.exports = mongoose.model('Bookshelf', bookshelfSchema);