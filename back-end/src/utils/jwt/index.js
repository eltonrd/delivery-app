require('dotenv/config');

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const CONFIG = { algorithm: 'HS256' };

const generateToken = ({ name, email, role }) => jwt.sign({ name, email, role }, SECRET, CONFIG);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return { message: 'Invalid token' };
  }
};

module.exports = { generateToken, verifyToken };
