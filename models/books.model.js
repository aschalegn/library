const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    id: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, required: true, default: new Date() },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
});


const Book = mongoose.model("Book", bookSchema);
module.exports = { Book };