const db = require('../services/login');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.login(email, password);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    if ('message' in user) return res.status(400).json({ message: user.message });
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
