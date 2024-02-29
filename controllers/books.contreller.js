const { Book } = require("../models/books.model");

const addBook = async (req, res) => {
    const body = req.body;
    try {
        console.log(req.user); //! the user property is added by the auth middleware

        body.author = req.user.id; //! change the author key by tour schema

        const newBook = new Book(body);
        newBook.id = newBook._id;
        await newBook.save();
        res.send({ message: "Added successfully", data: body });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
}

const getBooks = async (req, res) => {
    try {
        const query = req.query;
        const books = await Book.find({ ...query });
        res.send(books);
    } catch (error) {
        res.status(400).send("Error");
    }
}

module.exports = { addBook, getBooks }