const db = require('../services/user');

const getSellerUsers = async (_req, res, next) => {
  try {
    const sellersUsers = await db.getAllSellersUsers();
    return res.status(200).json(sellersUsers);
  } catch (err) {
    next(err);
  }
};

module.exports = { getSellerUsers };
