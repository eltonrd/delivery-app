const db = require('../services/admin');

const getAllUsers = async (_req, res, next) => {
  try {
    const allUsers = await db.getAllUsers();
    if (!allUsers) return res.status(404).json({ message: 'Users not found' });
    return res.status(201).json(allUsers);
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await db.register(name, email, password, role);
    if (!user) return res.status(409).json({ message: 'User already exists' });
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.deleteUser(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, register, deleteUser };
