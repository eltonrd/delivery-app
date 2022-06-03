const { Router } = require('express');
const { getUserOrders } = require('../controllers/sales');
const { getEmailFromToken } = require('../middlewares/user');

const orderRouter = Router();

orderRouter.get('/', getEmailFromToken, getUserOrders);

module.exports = orderRouter;
