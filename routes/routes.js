/***************************************************************************
    These routes are API routes only - meaning this project seed
    is not built to manage ui/pages for an entire website. It is set
    up to deliver the initial HTML page, and then the Angular app
    should handle all routes after that point. Any route that requires
    that the user be authenticated before using that endpoint should
    use the isAuthenticated middleware in this file  
***************************************************************************/

var express = require('express');
var router = express.Router();
var debug = require('debug')('dev');
var isAuthenticated = require('../passport/isauthenticated');


/* GET login or main page. Does NOT require authentication */
router.get('/', function (req, res) {
	// The main page to display
	debug('GET: index.html');
	res.render('index.html');
});

//Test route
router.get('/items', isAuthenticated, function (req, res) {
	res.json(["car", "bank", "toy", "dog"]);
});

module.exports = router;