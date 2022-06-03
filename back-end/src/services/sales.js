const { Sale } = require('../database/models');
const { salesProduct } = require('../database/models');

const createSale = async (sales, id, transaction) => {
  try {
    const { totalPrice, deliveryAddress, deliveryNumber, sellerId } = sales;
    const sale = await Sale.create({
      userId: id,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: 'pendente',
    }, { transaction });
    return sale.id;
  } catch (err) {
    console.log(err.message);
    return { message: 'Invalid Token' };
  }
};

const createSaleProducts = async (products, saleId, transaction) => {
  await Promise.all(products
    .map(({ id, quantity }) => salesProduct.create(
      { saleId, productId: id, quantity }, { transaction },
    )));
};

module.exports = {
  createSaleProducts,
  createSale,
};
