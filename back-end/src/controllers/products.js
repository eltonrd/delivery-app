const db = require('../services/products');

const getAllProducts = async (_req, res, next) => {
  try {
    const allProducts = await db.getAllProducts();
    if (!allProducts) return res.status(404).json({ message: 'Products not found' });
    return res.status(201).json(allProducts);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts };
