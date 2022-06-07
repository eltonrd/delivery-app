const express = require('express');
const cors = require('cors');

const loginRouter = require('../routes/login');
const registerRouter = require('../routes/register');
const productsRouter = require('../routes/products');
const adminRouter = require('../routes/admin');
const salesRouter = require('../routes/sales');
const errorMidleware = require('../middlewares/error');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/customer/products', productsRouter);
app.use('/admin/manage', adminRouter);
app.use('/sales', salesRouter);
app.use(express.static('public'));
app.use(errorMidleware);

module.exports = app;
