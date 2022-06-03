const { User } = require('../database/models');

async function getUserByParam(param, paramName) {
  const user = await User.findOne({ where: { [paramName]: param } });

  return user;
}

module.exports = {
  getUserByParam,
};
