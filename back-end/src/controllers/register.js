const db = require('../services/user');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.register(name, email, password);
    if (!user) return res.status(409).json({ message: 'User already exists' });
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
