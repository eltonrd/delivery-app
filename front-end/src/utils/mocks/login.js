import users from './users';

function login(email, password) {
  return users.find((user) => user.email === email && user.password === password);
}

export default login;
