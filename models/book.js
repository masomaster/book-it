const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    authors: [String],
    pubYear: { type: Number, minLength: 4, maxLength: 4 },
    publisher: String,
    totalPages: Number,
    pagesRead: Number,
    category: String,
    url: String,
    description: String,
    notes: String,
    feeling: String,
    pinned: { type: Boolean, default: false },
    done: { type: Boolean, default: false },
    owned: { type: Boolean, default: true },
    course: String,
    dueDate: Date,    
    img: String,
    lastReadingDate: Date,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookshelf: { type: Schema.Types.ObjectId, ref: "Bookshelf" },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
})

bookSchema.virtual('hrsToComplete').get(function() {

})

bookSchema.virtual('percentRead').get(function() {
    if (this.pagesRead && this.totalPages) return this.pagesRead / this.totalPages;
    else return 0;
})

bookSchema.statics.getLibrary = function(userId) {
    return this.find({user: userId});
}

module.exports = mongoose.model('Book', bookSchema);