const { Router } = require('express');

const { getAllProducts } = require('../controllers/products');

const productsRouter = Router();

productsRouter.get('/', getAllProducts);

module.exports = productsRouter;
