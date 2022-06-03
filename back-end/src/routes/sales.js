const { Router } = require('express');

const { createSale } = require('../controllers/sales');
const { getUser } = require('../middlewares/user');
const { saleMiddleware, saleProductsMiddleware } = require('../middlewares/sale');

const salesRouter = Router();

salesRouter.post('/', getUser, saleMiddleware, saleProductsMiddleware, createSale);

module.exports = salesRouter;
