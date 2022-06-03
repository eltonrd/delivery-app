const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');

const SECRET = readFileSync('jwt.evaluation.key', 'utf-8');
const CONFIG = { expiresIn: '1h', algorithm: 'HS256' };

const generateToken = ({ name, email, role }) => jwt.sign({ name, email, role }, SECRET, CONFIG);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return { message: 'Invalid token' };
  }
};

module.exports = { generateToken, verifyToken };
