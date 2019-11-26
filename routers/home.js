const controllers = require('../controllers');
const router = require('express').Router();

router.get('/', controllers.homeController.home);

module.exports = router;
