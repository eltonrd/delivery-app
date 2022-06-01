const { emailSchema, passwordSchema } = require('../utils/joiSchemas/loginSchemas');

const emailMiddleware = (req, res, next) => {
  const { email } = req.body;
  const { error } = emailSchema.validate({ email });
  if (error) {
    const [status, message] = error.message.split('/');
    return res.status(+status).json({ message });
  }
  next();
};

const passwordMiddleware = (req, res, next) => {
  const { password } = req.body;
  const { error } = passwordSchema.validate({ password });
  if (error) {
    const [status, message] = error.message.split('/');
    return res.status(+status).json({ message });
  }
  next();
};

module.exports = { emailMiddleware, passwordMiddleware };
