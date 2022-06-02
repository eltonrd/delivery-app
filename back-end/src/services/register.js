const md5 = require('md5');
const { User } = require('../database/models');

const register = async (name, email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) return false;
    const hash = md5(password);
    await User.create({ name, email, password: hash, role: 'customer' });
    return true;
  } catch (err) {
    return err;
  }
};

module.exports = { register };
