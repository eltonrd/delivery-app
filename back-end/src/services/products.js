const { Product } = require('../database/models');

const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (err) {
    return err;
  }
};

module.exports = { getAllProducts };