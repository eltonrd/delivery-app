const joi = require('joi');

const NAME_FIELD = '400/Name must be filled';
const EMAIL_FIELD = '400/Email must be filled';
const PASSWORD_FIELD = '400/Password must be filled';
const INCORRECT_NAME = '400/Name must have more than 12 characters';
const INCORRECT_EMAIL = '400/Email must follow the pattern test@test.com';
const INCORRECT_PASSWORD = '400/Password must have more than 6 characters';

const emailSchema = joi.object({
  email: joi.string().email().required().messages({
    'any.required': EMAIL_FIELD,
    'string.empty': EMAIL_FIELD,
    'string.email': INCORRECT_EMAIL,
  }),
});

const passwordSchema = joi.object({
  password: joi.string().min(6).required().messages({
    'any.required': PASSWORD_FIELD,
    'string.empty': PASSWORD_FIELD,
    'string.min': INCORRECT_PASSWORD,
  }),
});

const nameSchema = joi.object({
  name: joi.string().min(12).required().messages({
    'any.required': NAME_FIELD,
    'string.empty': NAME_FIELD,
    'string.min': INCORRECT_NAME,
  }),
});

module.exports = { emailSchema, passwordSchema, nameSchema };
