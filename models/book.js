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

bookSchema.virtual('percentRead').get(function() {
    if (this.pagesRead && this.totalPages){
        let percent = parseInt((this.pagesRead / this.totalPages)*100);
        return percent;
    }
    else return "Not started";
})

bookSchema.virtual('remainingPages').get(function() {
    if (this.totalPages){
        const remainingPages = this.totalPages - this.pagesRead;
        return remainingPages;
    }
    else return 0;
})

bookSchema.statics.getLibrary = function(userId) {
    return this.find({user: userId});
}

bookSchema.statics.getNextUp = function(userId) {
    return this.findOne({
        user: userId,
        pinned: true
    })
}

module.exports = mongoose.model('Book', bookSchema);