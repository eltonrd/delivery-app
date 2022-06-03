const { Router } = require('express');
const { getUserOrders } = require('../controllers/sales');

const orderRouter = Router();

orderRouter.get('/', getUserOrders);

module.exports = orderRouter;
