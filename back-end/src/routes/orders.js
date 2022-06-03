const { Router } = require('express');
const { getUserOrders, getSellerOrders } = require('../controllers/sales');
const { getEmailFromToken } = require('../middlewares/user');

const orderRouter = Router();
const sellerOrderRouter = Router();

orderRouter.get('/', getEmailFromToken, getUserOrders);
sellerOrderRouter.get('/', getEmailFromToken, getSellerOrders);

module.exports = { orderRouter, sellerOrderRouter };
