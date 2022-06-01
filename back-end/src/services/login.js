const md5 = require('md5');
const { User } = require('../database/models');

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { message: 'User does not exist' };
    }
    if (md5(password) !== user.password) {
      return { message: 'Incorrect email or password' };
    }
    return user;
  } catch (err) {
    return err;
  }
};

module.exports = { login };
