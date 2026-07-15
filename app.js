const path = require('path');
require("dotenv").config();

const express = require("express");
const session = require("express-session");

const UserRouter = require("./routers/UserRouter");
const { default: mongoose } = require('mongoose');

const app = express();
app.set("view engine" , "ejs");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"views")))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
    })
);
app.use(UserRouter);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);    });

})
.catch((error) => {
    console.log("Error while connecting:", error);
});