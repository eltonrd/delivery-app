const { Sale } = require('../database/models');
const { SaleProduct } = require('../database/models');

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
    return { message: 'Cannot create sale' };
  }
};

const createSaleProducts = async (products, saleId, transaction) => {
  await Promise.all(products
    .map(({ id, quantity }) => SaleProduct.create(
      { saleId, productId: id, quantity }, { transaction },
    )));
};

module.exports = {
  createSaleProducts,
  createSale,
};
