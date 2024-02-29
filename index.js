const { app } = require("./app");
const mongoose = require("mongoose");
const { config } = require("./config");

mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log("connected to db");
    }).catch(error => {
        console.log(error);
    });

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
});