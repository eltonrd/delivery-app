const md5 = require('md5');
const { User } = require('../database/models');
const { generateToken } = require('../utils/jwt');

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll();
    if (!allUsers) return false;
    return allUsers;
  } catch (err) {
    return err;
  }
};

const register = async (name, email, password, role) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) return false;
    const hashPassword = md5(password);
    const newUser = await User.create({ name, email, password: hashPassword, role });
    const { name: userName, email: userEmail, role: userRole } = newUser;
    generateToken({ name: userName, userEmail, role: userRole });
    return true;
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id) => {
  try {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return false;
    return true;
  } catch (err) {
    return err;
  }
};

module.exports = { register, getAllUsers, deleteUser };
