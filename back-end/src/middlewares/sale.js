const { saleSchema, saleProductSchema } = require('../utils/joiSchemas/saleSchema');

const saleMiddleware = (req, res, next) => {
  const { totalPrice, deliveryAddress, deliveryNumber } = req.body;
  const { error } = saleSchema.validate({ totalPrice, deliveryAddress, deliveryNumber });
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  next();
};

const saleProductsMiddleware = (req, res, next) => {
  const { products } = req.body;
  const joiValidate = products.map((product) => saleProductSchema.validate(product));

  const joiError = joiValidate.find((validation) => !!validation.error)

  if (!joiError) {
   
    return next();
  }
  
  const { error: { message } } = joiError;
  return res.status(400).json({ message });
};

module.exports = { saleMiddleware, saleProductsMiddleware };
