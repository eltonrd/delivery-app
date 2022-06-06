const validUser = {
	email: 'zebirita@email.com',
	password: '$#zebirita#$',
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

module.exports = {
  validUser,
  userDbResponse,
  inValidUser,
  userWithoutEmail,
  userWithoutPassword,
};
