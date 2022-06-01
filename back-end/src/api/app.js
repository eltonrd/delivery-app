const express = require('express');
const cors = require('cors');

const loginRouter = require('../routes/login');
const errorMidleware = require('../middlewares/error');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/login', loginRouter);
app.use(errorMidleware);

module.exports = app;
