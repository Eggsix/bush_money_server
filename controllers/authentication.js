const jwt = require('jwt-simple');
const User =require('../models/user');
const config = require('../config');

const salt_key = process.env.PASSWORD_SALT || config.secret;

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, salt_key);
}

exports.signin = function (req, res, next) {
	// User has already had their email and password auth'd 
	// we just to give them a token
	res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({error: "you must provide email and password!"});
	}
	// See if a user with a given email exists
	User.findOne({ email: email }, function(err, existingUser) {

		if (err) { return next(err); }
		
		// If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: "Email is in use"});
		}
		
		// If a user with email does NOT exist, create and save user record
		const user = new User ({
			email: email,
			password: password
		});

		// Respond to request indicationg the user was created
		user.save(function(err) {
			if (err) {return next(err); }
			res.json({ token: tokenForUser(user) });
		});
	});
}