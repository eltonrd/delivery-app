const { Router } = require('express');
const { emailMiddleware, passwordMiddleware, nameMiddleware } = require('../middlewares/user');
const registerController = require('../controllers/register');

const registerRouter = Router();

registerRouter.post('/', 
emailMiddleware,
passwordMiddleware,
nameMiddleware,
registerController.register);

module.exports = registerRouter;
