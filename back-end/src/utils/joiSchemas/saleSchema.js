const joi = require('joi');

const TOTAL_PRICE_FIELD = 'totalPrice must be filled';
const TOTAL_PRICE_NUMBER = 'totalPrice must be a number greater than 0';
const DELIVERY_ADDRESS_FIELD = 'deliveryAddress must be filled';
const DELIVERY_NUMBER_FIELD = 'deliveryNumber must be filled';
const PRODUCT_QTY_FIELD = 'product quantity must be filled';
const PRODUCT_QTY_NUMBER = 'product quantity must be a number greater than 0';
const PRODUCT_ID_FIELD = 'product id must be filled';

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

const saleProductSchema = joi.object({
  quantity: joi.number().greater(0).required().messages({
    'any.required': PRODUCT_QTY_FIELD,
    'any.number': PRODUCT_QTY_NUMBER,
    'number.greater': PRODUCT_QTY_NUMBER,
  }),
  id: joi.number().required().messages({
    'any.required': PRODUCT_ID_FIELD,
  }),
});

module.exports = { saleSchema, saleProductSchema };
