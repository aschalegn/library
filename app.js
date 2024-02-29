const express = require("express");
const cors = require("cors");
const booksRouter = require("./routes/books.routes");
const usersRouter = require("./routes/users.routes");

// let tasks = [];

const app = express();

app.use(cors());
app.use(express.json());


// app.post("*", (req, res) => { 
//     console.log(req.body);
// });


app.use("/api/v1/books", booksRouter);
app.use("/api/v1/users", usersRouter);

// app.get("/api/v1/tasks", (req, res) => {
//     res.send(tasks);
// });

module.exports = { app };