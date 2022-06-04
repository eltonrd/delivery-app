const { Router } = require('express');
const { getUserOrders, getSellerOrders, getUserOrdersById } = require('../controllers/sales');
const { getEmailFromToken } = require('../middlewares/user');

const orderRouter = Router();
const sellerOrderRouter = Router();

orderRouter.get('/', getEmailFromToken, getUserOrders);
orderRouter.get('/:id', getEmailFromToken, getUserOrdersById);
sellerOrderRouter.get('/', getEmailFromToken, getSellerOrders);

module.exports = { orderRouter, sellerOrderRouter };
