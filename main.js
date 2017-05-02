var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var genuuid = require('uid2');
var mongoose = require('mongoose');
var passport = require('passport');
var passportInit = require('./passport/init');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var authRoutes = require('./routes/authroutes');
var routes = require('./routes/routes');
var debug = require('debug')('dev');
var database = mongoose.connect('mongodb://localhost/local');
var flash = require('connect-flash');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.use(expressSession({
	genid: function (req) {
		return genuuid(62) // use UUIDs for session IDs
	},
	secret: 'secretkey',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 6000 * 24 * 24
	}
}));

app.use(passport.initialize());
app.use(passport.session());
passportInit(passport);
app.use(flash());

app.use('/', authRoutes(passport));
app.use('/', routes);

//This is 404 for API requests - UI/View 404s should be
//handled in Angular
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.set('port', 5050);
var server = app.listen(app.get('port'), function () {
	debug('Express server listening on port ' + server.address().port);
});
