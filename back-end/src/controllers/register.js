const db = require('../services/register');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.register(name, email, password);
    if (!user) return res.status(400).json({ message: 'User already exists' });
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
