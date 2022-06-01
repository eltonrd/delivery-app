const express = require('express');

const loginRouter = require('../routes/login');
const registerRouter = require('../routes/register');
const errorMidleware = require('../middlewares/error');

const app = express();
app.use(express.json());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use(errorMidleware);

module.exports = app;
