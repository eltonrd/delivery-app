const db = require('../services/products');

const getAllProducts = async (_req, res, next) => {
  try {
    const allProducts = await db.getAllProducts();
    return res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts };
