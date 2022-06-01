const { Router } = require('express');

const { emailMiddleware, passwordMiddleware } = require('../middlewares/login');
const loginController = require('../controllers/login');

const loginRouter = Router();

loginRouter.post('/', emailMiddleware, passwordMiddleware, loginController.login);

module.exports = loginRouter;
