const express = require("express");
const mongoose = require("mongoose");
const authroutes = require("./routes/authroutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// Instance of express app
const app = express();

// DB URI
const dbUri = "mongodb://localhost/iuserdata";

// Database connection
mongoose
    .connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => app.listen(5000, () => console.log("Server is Running")))
    .catch((err) => console.log(err));

// *** Middlewares ***
// Access to public files css & img
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // use this to parse form data
app.use(cookieParser());
app.use(express.json());

// Default view engine
app.set("view engine", "ejs");

// Passing Multiple views
app.set("views", ["./views", "./views/authroutes"]);

// **** Routes ****
app.get("*", checkUser);

// Home Route
app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

// Flavours
app.get("/flavours", requireAuth, (req, res) => {
    res.render("flavours", { title: "Flavours" });
});

// About
app.get("/about", (req, res) => {
    res.render("about", { title: "About Us" });
});

// Authroutes
app.use(authroutes);

// 404 Page
app.use((req, res) => {
    res.render("error", { title: "Not Found" });
});

module.exports = app;
