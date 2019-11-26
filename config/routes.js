// const cubeController = require('../controllers/cube');
// const accessoryController = require('../controllers/accessory');
// const authController = require('../controllers/auth');
// const { auth } = require('../utils');
const routers = require('../routers')

module.exports = app => {
    app.use('/', routers.home)
    app.use('/home', routers.home)
    app.use('/user', routers.user)

    app.use('*', (req, res, next) => {
        res.send('<h1>No view for this one but here comes error page</h1>')
    })
}
