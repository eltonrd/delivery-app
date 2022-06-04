const { Router } = require('express');
const {
  getUserOrders,
  getSellerOrders,
  getUserOrdersById,
  getsellerOrdersById,
} = require('../controllers/sales');
const { getEmailFromToken } = require('../middlewares/user');

const orderRouter = Router();
const sellerOrderRouter = Router();

orderRouter.get('/', getEmailFromToken, getUserOrders);
orderRouter.get('/:id', getEmailFromToken, getUserOrdersById);
sellerOrderRouter.get('/', getEmailFromToken, getSellerOrders);
sellerOrderRouter.get('/:id', getEmailFromToken, getsellerOrdersById);

module.exports = { orderRouter, sellerOrderRouter };
