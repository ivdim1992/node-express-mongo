const models = require('../models');
console.log(models.UserModel);
const utils = require('../utils');
const appConfig = require('../app-config');

function login(req, res) {
	res.render('user/login.hbs');
}

function loginPost(req, res, next) {
	const { username, password } = req.body;
	models.UserModel.findOne({ username })
		.then(user => Promise.all([user, user.matchPassword(password)]))
		.then(([user, match]) => {
			if (!match) {
				res.render('user/login.hbs', {
					massage: 'Wrong password or username!',
				});
				return;
			}

			const token = utils.jwt.createToken({ id: user._id });
			res.cookie(appConfig.authCookieName, token)
				.cookie('username', user.username)
				.redirect('/');
		});
}

function register(req, res) {
	res.render('user/register.hbs');
}

function registerPost(req, res, next) {
	const { username, password, repeatPassword } = req.body;
	if (password !== repeatPassword) {
		res.render('user/register.hbs', {
			errors: {
				repeatPassword: "Password and repeat password don't match!",
			},
		});
		return;
	}

	return models.UserModel.create({ username, password })
		.then(() => {
			res.redirect('/login');
		})
		.catch(err => {
			if (err.name === 'MongoError' && err.code === 11000) {
				res.render('register.hbs', {
					errors: {
						username: 'Username already taken!',
					},
				});
				return;
			}
			next(err);
		});
}

function logout(req, res) {
	const token = req.cookies[appConfig.authCookieName];
	models.tokenBlacklistModel.create({ token }).then(() => {
		res.clearCookie(appConfig.authCookieName).redirect('/');
	});
}

module.exports = {
	login,
	loginPost,
	register,
	registerPost,
	logout,
};
