const NAME = 'valid_user_name';
const EMAIL = 'user@user.com';
const TOKEN = 'valid_token';

const customer = {
  user: {
    name: NAME,
    email: EMAIL,
    role: 'customer',
  },
  token: TOKEN,
};

const seller = {
  user: {
    name: NAME,
    email: EMAIL,
    role: 'seller',
  },
  token: TOKEN,
};

const administrator = {
  user: {
    name: NAME,
    email: EMAIL,
    role: 'administrator',
  },
  token: TOKEN,
};

module.exports = {
  customer,
  seller,
  administrator,
};
