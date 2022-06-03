const { getUserByParam } = require('../services/user');
const { verifyToken } = require('../utils/jwt');

const getUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { email } = verifyToken(authorization);
    const user = await getUserByParam(email, 'email');
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    req.body = { ...req.body, userId: user.id };
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = getUser;
