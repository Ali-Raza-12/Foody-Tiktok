const express = require("express")
require("dotenv").config();
const cookiesParser = require("cookie-parser")
const userRoutes = require('./routes/auth.routes');
const errorHandler = require("./utills/ErrorHandler");

const app = express();

app.use(express.json());
app.use(cookiesParser());

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/api/auth", userRoutes)


app.use(errorHandler)

module.exports = app;