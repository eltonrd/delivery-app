const { saleSchema, saleProductSchema } = require('../utils/joiSchemas/saleSchema');

const saleMiddleware = (req, res, next) => {
  const { totalPrice, deliveryAddress, deliveryNumber } = req.body;
  const { error } = saleSchema.validate({ totalPrice, deliveryAddress, deliveryNumber });
  if (error) {
    const [code, message] = error.message.split('/');
    return res.status(+code).json({ message });
  }
  next();
};

const saleProductsMiddleware = (req, res, next) => {
  const { products } = req.body;
  const { error } = saleProductSchema.validate(products);
  if (error) {
    const [code, message] = error.message.split('/');
    return res.status(+code).json({ message });
  }
  next();
};

module.exports = { saleMiddleware, saleProductsMiddleware };
