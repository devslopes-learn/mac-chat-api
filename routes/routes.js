var express = require('express');
var router = express.Router();
var debug = require('debug')('dev');
var isAuthenticated = require('../passport/isauthenticated');

//Test route
router.get('/items', function (req, res) {
	res.json(["car", "bank", "toy", "dog"]);
});

module.exports = router;
