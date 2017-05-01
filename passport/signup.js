var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user');
var bCrypt = require('bcrypt-nodejs');
var PASS_LENGTH_MIN = 4;
var USER_LENGTH_MIN = 3;

module.exports = function (passport) {

	passport.use('signup', new LocalStrategy({
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		function (req, username, password, done) {

			findOrCreateUser = function () {
				// find a user in Mongo with provided username

				if (password.length < PASS_LENGTH_MIN)
					return done("Password must be at least " + PASS_LENGTH_MIN + " characters");

				if (username.length < USER_LENGTH_MIN)
					return done("Username must be at least " + USER_LENGTH_MIN + " characters");

				User.findOne({
					'username': username
				}, function (err, user) {
					// In case of any error, return using the done method
					if (err) {
						console.log('Error in SignUp: ' + err);
						return done(err);
					}
					// already exists
					if (user) {
						return done('User already exists with username: ' + username, false);
					} else {
						// if there is no user with that email
						// create the user
						var newUser = new User();

						// set the user's local credentials
						newUser.username = username;
						newUser.password = createHash(password);
						newUser.email = req.param('email');
						newUser.firstName = req.param('firstName');
						newUser.lastName = req.param('lastName');

						// save the user
						newUser.save(function (err) {
							if (err) {
								console.log('Error in Saving user: ' + err);
								throw err;
							}
							console.log('User Registration succesful');
							return done(null, newUser);
						});
					}
				});
			};
			// Delay the execution of findOrCreateUser and execute the method
			// in the next tick of the event loop
			process.nextTick(findOrCreateUser);
		}));



	// Generates hash using bCrypt
	var createHash = function (password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}

}