const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    authors: [String],
    pubYear: { type: Number, minLength: 4, maxLength: 4 },
    publisher: String,
    totalPages: Number,
    pagesRead: { type: Number, default: 0 },
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
    return this.find({user: userId}).sort({"title":1});
}

bookSchema.statics.getNextUp = function(userId) {
    return this.findOne({
        user: userId,
        pinned: true
    })
}

bookSchema.statics.getInProgressBooks = function(userId) {
    return this.find({
        user: userId,
        $and: [
            {$and: [
                {$expr: {$gt: ["$pagesRead", 0 ]}},
                {$isNumber: "$pagesRead"}
            ]}, 
            {$expr: { $ne: ["$pagesRead", "$totalPages"]}}
        ],
        done: false,
    })
}

bookSchema.statics.getBooksRead = function(userId) {
    return this.find({
        user: userId,
        $or: [{done: true}, {$expr: { $eq: ["$pagesRead", "$totalPages"]}}] 
        
    })
}

module.exports = mongoose.model('Book', bookSchema);