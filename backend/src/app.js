const express = require("express")
require("dotenv").config();
const cookiesParser = require("cookie-parser")
const userRoutes = require('./routes/auth.routes');
const errorHandler = require("./utills/ErrorHandler");
const foodRoutes = require("./routes/foodItems.routes")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookiesParser());

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use("/api/auth", userRoutes)
app.use("/api/foodItem", foodRoutes)


app.use(errorHandler)

module.exports = app;