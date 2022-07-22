const { Router } = require('express');
const { getSellerUsers } = require('../controllers/seller');

const sellerRouter = Router();

sellerRouter.get('/', getSellerUsers);

module.exports = sellerRouter;