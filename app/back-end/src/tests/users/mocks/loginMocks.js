const validUser = {
	email: 'zebirita@email.com',
	password: '$#zebirita#$',
};

const validSeller = {
  email: 'fulana@deliveryapp.com',
  password: 'fulana@123',
};

const inValidUser = {
  email: 'zebirita@email.com',
	password: '$#zebirita#$$',
};

const userDbResponse = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
};

const userWithoutEmail = {
  password: '123456789',
};

const userWithoutPassword = {
  email: 'mock@mock.com',
};

const sellerDbResponse = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: '3c28d2b0881bf46457a853e0b07531c6',
  role: 'seller',
};

module.exports = {
  validUser,
  validSeller,
  userDbResponse,
  inValidUser,
  userWithoutEmail,
  userWithoutPassword,
  sellerDbResponse,
};
