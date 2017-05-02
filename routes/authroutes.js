var express = require('express');
var router = express.Router();
var debug = require('debug')('dev');
var isAuthenticated = require('../passport/isauthenticated');

module.exports = function (passport) {

	/* Handle Login POST */
	router.post('/login', function (req, res, next) {

		passport.authenticate('login', function (err, user, info) {

			if (err) {
				return res.send(401, {
					message: err
				});
			}
			req.login(user, function (err) {
				if (err) {
					return next(err);
				}

				return res.send(200, {
					message: 'authentication succeeded',
					token: req.sessionID
				});
			});

		})(req, res, next);

	});

	/* Handle Registration POST */
	router.post('/signup', function (req, res, next) {

		passport.authenticate('signup', function (err, user, info) {
			if (err)
				res.send(401, {
					message: err
				});

			req.login(user, function (err) {
				if (err) {
					return next(err);
				}

				return res.send(200, {
					message: 'account creation succeeded',
				});
			});

		})(req, res, next);

	});

	/* Handle Logout */
	router.get('/signout', function (req, res) {
		req.logout();
		res.json('Successfully logged out');
	});

	return router;
}
