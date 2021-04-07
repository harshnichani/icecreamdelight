const express = require("express");
const authcontroller = require("../controllers/authcontroller");

// Router
const router = express.Router();

// Signup Routes
router.get("/signup", authcontroller.signup_get);

router.post("/signup", authcontroller.signup_post);

// Login Routes
router.get("/login", authcontroller.login_get);

router.post("/login", authcontroller.login_post);

// Logout Route

router.get("/logout", authcontroller.logout_get);

// Export Module
module.exports = router;
