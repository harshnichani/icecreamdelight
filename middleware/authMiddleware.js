const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// Check jwt exits & is verified
	if (token) {
		jwt.verify(token, "T0y0t@F0rtun3r", (err, decodedToken) => {
			if (err) {
				res.redirect("/login");
			} else {
				next();
			}
		});
	} else {
		res.redirect("/login");
	}
};

// Check Current User
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;

	// Check jwt exits & is verified
	if (token) {
		jwt.verify(token, "T0y0t@F0rtun3r", async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = {
	requireAuth,
	checkUser,
};
