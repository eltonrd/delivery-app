const md5 = require('md5');
const { User } = require('../database/models');

const { generateToken } = require('../utils/jwt');

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return undefined;
    if (md5(password) !== user.password) {
      return { message: 'Incorrect email or password' };
    }
    const { name, role } = user;
    const token = generateToken({ name, email, role });
    return { user: { name, email, role }, token };
  } catch (err) {
    return err;
  }
};

module.exports = { login };
