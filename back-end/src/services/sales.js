const { Sale } = require('../database/models');
const { SaleProduct, Product } = require('../database/models');
const { getUserByParam } = require('./user');

const USER_NOT_FOUND = 'User does not exist';

const createSale = async (sales, id, transaction) => {
  try {
    const { totalPrice, deliveryAddress, deliveryNumber, sellerId } = sales;
    const sale = await Sale.create({
      userId: id,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
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

const getUserSales = async (email) => {
  const user = await getUserByParam(email, 'email');
  if (!user) return { message: USER_NOT_FOUND };
  if (user.role !== 'customer') throw new Error();
  const sales = await Sale.findAll({ where: { userId: user.id } });
  return sales;
};

const getUserSalesById = async (id, email) => {
  const user = await getUserByParam(email, 'email');
  if (!user) return { message: USER_NOT_FOUND };
  const sale = await Sale.findOne({ where: { id } });
  if (!sale) return { message: 'Order not found' };
  if (user.id !== sale.userId) throw new Error();
  const order = await Sale.findOne({ where: { userId: user.id, id },
    include: [{
      model: Product,
      as: 'products',
      through: { attributes: ['quantity'] },
    }], })
  return order;
};

const getSellerSales = async (email) => {
  const seller = await getUserByParam(email, 'email');
  if (!seller) return { message: USER_NOT_FOUND };
  if (seller.role !== 'seller') throw new Error();
  const sales = await Sale.findAll({ where: { sellerId: seller.id } });
  return sales;
};

const getSellerSalesById = async (id, email) => {
  const user = await getUserByParam(email, 'email');
  if (!user) return { message: USER_NOT_FOUND };
  const sale = await Sale.findOne({ where: { sellerId: seller.id, id },
    include: [{
      model: Product,
      as: 'products',
      through: { attributes: ['quantity'] },
    }], });
  if (!sale) return { message: 'Order not found' };
  if (user.id !== sale.sellerId) throw new Error();
  return sale;
};

const startingOrder = async (id) => Sale.update({ status: 'Preparando' }, { where: { id } });

const leavingForDelivery = async (id) => Sale.update({ status: 'Em Trânsito' }, { where: { id } });

const orderDelivered = async (id) => Sale.update({ status: 'Entregue' }, { where: { id } });

module.exports = {
  createSaleProducts,
  createSale,
  getUserSales,
  getUserSalesById,
  getSellerSales,
  getSellerSalesById,
  startingOrder,
  leavingForDelivery,
  orderDelivered,
};
