const { sequelize } = require('../database/models');
const Sale = require('../services/sales');

const ORDER_NOT_FOUND = 'Order not found';

const createSale = async (req, res, next) => {
  try {
    const {
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products,
      sellerId,
      userId,
    } = req.body;

    const id = await sequelize.transaction(async (t) => {
      const saleId = await Sale
        .createSale({ totalPrice, deliveryAddress, deliveryNumber, sellerId }, userId, t);
      return saleId;
    });
    if (id.message) return res.status(500).json({ message: id.message });
    await sequelize.transaction(async (t) => Sale.createSaleProducts(products, id, t));

    res.status(201).json({ id, products });
  } catch (error) { next(error); }
};

const getUserOrders = async (req, res, next) => {
  try {
    const { email } = req.body;
    const orders = await Sale.getUserSales(email);
    if (orders.message) return res.status(404).json({ message: orders.message });
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

const getUserOrdersById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const order = await Sale.getUserSalesById(+id, email);
    if (order.message) return res.status(404).json({ message: order.message });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(403).json({ message: 'Access denied' });
  }
};

const getSellerOrders = async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerOrders = await Sale.getSellerSales(email);
    if (sellerOrders.message) return res.status(404).json({ message: sellerOrders.message });
    return res.status(200).json(sellerOrders);
  } catch (err) {
    next(err);
  }
};

const getsellerOrdersById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const order = await Sale.getSellerSalesById(+id, email);
    if (order.message) return res.status(404).json({ message: order.message });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(403).json({ message: 'Access denied' });
  }
};

const startingOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderId = await Sale.startingOrder(id);
    if (!orderId) return res.status(404).json({ message: ORDER_NOT_FOUND });
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const leavingForDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderId = await Sale.leavingForDelivery(id);
    if (!orderId) return res.status(404).json({ message: ORDER_NOT_FOUND });
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const orderDelivered = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderId = await Sale.orderDelivered(id);
    if (!orderId) return res.status(404).json({ message: ORDER_NOT_FOUND });
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSale,
  getUserOrders,
  getUserOrdersById,
  getSellerOrders,
  getsellerOrdersById,
  startingOrder,
  leavingForDelivery,
  orderDelivered,
};
