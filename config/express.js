const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const config = require('./config');
// const bodyParser = require('body-parser');
const secret = 'secret';

module.exports = app => {
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	// app.use(cookieParser(secret));
	app.engine(
		'.hbs',
		handlebars({
			extname: '.hbs',
			defaultLayout: 'main-layout',
			layoutsDir: 'views',
			partialsDir: 'views/partials',
		})
	);

	app.use((req, res, next) => {
		res.locals.isLoggedIn = req.cookies[config.cookie] !== undefined;
		res.locals.username = req.cookies['username'];
		next();
	});

	app.set('view engine', 'hbs');
	app.use(express.static('./static'));
};
