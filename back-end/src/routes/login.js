const { Router } = require('express');

const { emailMiddleware, passwordMiddleware } = require('../middlewares/login');
const loginController = require('../controllers/login');

const logintRouter = Router();

logintRouter.post('/', emailMiddleware, passwordMiddleware, loginController.login);

module.exports = logintRouter;
