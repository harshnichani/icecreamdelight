const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Error handling function
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    // Incorrect email
    if (err.message === "Email does not exist") {
        errors.email = "That email is not registered";
    }

    // Incorrect password
    if (err.message === "Incorrect Password") {
        errors.password = "Password Incorrect";
    }

    // Duplicate email
    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;
    }

    // Validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

const maxAge = 3 * 24 * 60 * 60;

// // Creating JWT token
const createToken = (id) => {
    return jwt.sign({ id }, "T0y0t@F0rtun3r", { expiresIn: maxAge }); // payload | secret | expiry in secs
};

// Get Request Functions

const signup_get = (req, res) => {
    res.status(200).render("signup", { title: "Sign Up" });
};

const login_get = (req, res) => {
    res.status(200).render("login", { title: "Login" });
};

// Post Request Functions

const signup_post = async (req, res) => {
    try {
        const userCreated = await User.create(req.body);
        const token = createToken(userCreated._id);

        // Setting cookies and passing jwt
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(200).json({ userCreated: userCreated._id });
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).json({ err });
    }
};

const login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        // Setting cookies and passing jwt
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(200).json({ user: user._id });
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).json({ err });
    }
};

// Logout Route

const logout_get = (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1000 });
    res.redirect("/");
};

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get,
};
