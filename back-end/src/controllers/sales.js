const { sequelize } = require('../database/models');
const Sale = require('../services/sales');

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
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

const getSellerOrders = async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerOrders = await Sale.getSellerSales(email);
    return res.status(200).json(sellerOrders);
  } catch (err) {
    next(err);
  }
};

module.exports = {
 createSale,
 getUserOrders,
 getSellerOrders,
};
