var login = require('./login');
var signup = require('./signup');
var User = require('../model/user');

module.exports = function (passport) {

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function (user, done) {

		if (!user) {
			return done("Err logging in. Did you send up an empty string?");
		}
		console.log('serializing user: ');
		console.log(user);
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			console.log('deserializing user:', user);
			done(err, user);
		});
	});

	login(passport);
	signup(passport);
}