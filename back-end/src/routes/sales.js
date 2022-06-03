const { Router } = require('express');

const { createSale } = require('../controllers/sales');
const getUser = require('../middlewares/getUser');

const salesRouter = Router();

salesRouter.post('/', getUser, createSale);

module.exports = salesRouter;
