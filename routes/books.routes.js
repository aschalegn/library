const { Router } = require("express");
const { Book } = require("../models/books.model");
const { addBook, getBooks } = require("../controllers/books.contreller");
const { auth } = require("../middlewares/auth");

const router = Router();

let books = [];



router.get("/", getBooks);

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).populate("author");
        res.send(book);
    } catch (error) {
        res.status(400).send("Error");
    }
});



router.post("/", auth, addBook);























// update
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const foundBook = books.find(book => book.id === id);
    if (foundBook) {
        books = books.map(book => {
            if (book.id === id) return body;
            else return book;
        });
    }
    else books.push(body);
    res.send(body);
});

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const phone = req.params.phone;
    console.log({ id, phone });
    const body = req.body;
    const foundBook = books.find(book => book.id == id);
    console.log(foundBook);
    if (foundBook) {
        books = books.map(book => {
            if (book.id == id) return { ...book, ...body };
            else return book;
        });
        return res.send(body);
    }
    else res.send("Not Found");
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Book.findByIdAndDelete(id);
        res.send(books);
    } catch (error) {
        res.status(400).send("Error");
    }
});



module.exports = router;