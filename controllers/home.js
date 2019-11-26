function home(req, res, next) {
	res.render('partials/home.hbs');
	// { isLoggedIn: { req.cookies[config.cookie] !== undefined } }
}

module.exports = { home };
