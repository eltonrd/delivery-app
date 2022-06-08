const md5 = require('md5');
const { User } = require('../database/models');
const { generateToken } = require('../utils/jwt');

async function getUserByParam(param, paramName) {
  const user = await User.findOne({ where: { [paramName]: param } });

  return user;
}

const register = async (name, email, password, role = 'customer') => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) return false;
    const hash = md5(password);
    await User.create({ name, email, password: hash, role });
    const token = generateToken({ name, email, role });
    return { user: { name, email, role }, token };
  } catch (err) {
    return err;
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
    return allUsers;
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id) => {
  try {
    const deleted = await User.destroy({ where: { id } });
    return deleted;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getUserByParam,
  register,
  getAllUsers,
  deleteUser,
};
