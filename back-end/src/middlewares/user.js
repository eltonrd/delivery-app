const { emailSchema, passwordSchema, nameSchema } = require('../utils/joiSchemas/userSchemas');
const { getUserByParam } = require('../services/user');
const { verifyToken } = require('../utils/jwt');

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

const nameMiddleware = (req, res, next) => {
  const { name } = req.body;
  const { error } = nameSchema.validate({ name });
  if (error) {
    const [status, message] = error.message.split('/');
    return res.status(+status).json({ message });
  }
  next();
};

const getUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = verifyToken(authorization);
  if (token.message) return res.status(401).json({ message: token.message });
  const user = await getUserByParam(token.email, 'email');
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  req.body = { ...req.body, userId: user.id };
  next();
};

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const verify = verifyToken(authorization);
  if (verify.message) return res.status(401).json({ message: verify.message });
  if (verify.role !== 'administrator') return res.status(403).json({ message: 'Access denied' });
  next();
};

const getEmailFromToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = verifyToken(authorization);
  if (token.message) return res.status(401).json({ message: token.message });
  req.body = { email: token.email };
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = verifyToken(authorization);
  if (token.message) return res.status(401).json({ message: token.message });
  next();
};

module.exports = {
  emailMiddleware,
  passwordMiddleware,
  nameMiddleware,
  getUser,
  authMiddleware,
  getEmailFromToken,
  validateToken,
};
