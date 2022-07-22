const { Router } = require('express');
const { emailMiddleware, passwordMiddleware,
  nameMiddleware, authMiddleware } = require('../middlewares/user');
const adminController = require('../controllers/admin');

const adminRouter = Router();

adminRouter.get('/',
authMiddleware,
adminController.getAllUsers);

adminRouter.post('/',
authMiddleware,
emailMiddleware,
passwordMiddleware,
nameMiddleware,
adminController.register);

adminRouter.delete('/:id',
authMiddleware,
adminController.deleteUser);

module.exports = adminRouter;