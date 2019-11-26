const controllers = require('../controllers');
const router = require('express').Router();

router.get('/login', controllers.authController.login);
router.get('/register', controllers.authController.register);
router.get('/logout', controllers.authController.logout);

router.post('/login', controllers.authController.loginPost);
router.post('/register', controllers.authController.registerPost);

module.exports = router;