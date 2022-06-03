const { getUserByParam } = require('../services/user');
const { verifyToken } = require('../utils/jwt');

const getUser = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const { email } = verifyToken(authorization);
    const user = await getUserByParam(email, 'email');
    if (!user) return next(new Error('User does not exist'));
    req.body = { ...req.body, userId: user.id };
    
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
