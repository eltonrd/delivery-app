const joi = require('joi');

const TOTAL_PRICE_FIELD = '400/totalPrice must be filled';
const TOTAL_PRICE_NUMBER = '400/totalPrice must be a number greater than 0';
const DELIVERY_ADDRESS_FIELD = '400/deliveryAddress must be filled';
const DELIVERY_NUMBER_FIELD = '400/deliveryNumber must be filled';
const PRODUCT_QTY_FIELD = '400/product quantity must be filled';
const PRODUCT_QTY_NUMBER = '400/product quantity must be a number greater than 0';
const PRODUCT_ID_FIELD = '400/product id must be filled';
const PRODUCT_ID_MIN = '400/product id must be at least number 1';
const PRODUCT_ARRAY = '400/product must be in an array';

const saleSchema = joi.object({
  totalPrice: joi.number().greater(0).required().messages({
    'any.required': TOTAL_PRICE_FIELD,
    'any.number': TOTAL_PRICE_NUMBER,
    'number.greater': TOTAL_PRICE_NUMBER,
  }),
  deliveryAddress: joi.string().required().messages({
    'any.required': DELIVERY_ADDRESS_FIELD,
  }),
  deliveryNumber: joi.string().required().messages({
    'any.required': DELIVERY_NUMBER_FIELD,
  }),
});

const saleProductSchema = joi.array().items(joi.object({
  quantity: joi.number().greater(0).required().messages({
    'any.required': PRODUCT_QTY_FIELD,
    'any.number': PRODUCT_QTY_NUMBER,
    'number.greater': PRODUCT_QTY_NUMBER,
  }),
  id: joi.number().min(1).required().messages({
    'any.required': PRODUCT_ID_FIELD,
    'number.min': PRODUCT_ID_MIN,
  }),
})).required().messages({
  'any.required': PRODUCT_ARRAY,
});

module.exports = { saleSchema, saleProductSchema };
