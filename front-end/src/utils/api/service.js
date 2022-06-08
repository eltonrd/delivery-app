import axios from 'axios';

export async function login(email, password) {
  const user = await axios.post(
    'http://localhost:3001/login',
    {
      email,
      password,
    },
  )
    .then((result) => result.data)
    .catch((error) => console.log(error));

  return user;
}

export async function register(name, email, password) {
  const user = await axios.post(
    'http://localhost:3001/register',
    {
      name,
      email,
      password,
    },
  )
    .then((result) => result.data)
    .catch((error) => console.log(error));

  return user;
}

export async function getProducts() {
  const fetchProducts = await axios.get(
    'http://localhost:3001/customer/products',
  ).then((result) => result.data).catch((error) => console.log(error));

  return fetchProducts;
}

export async function adminRegister(user, token) {
  const headers = {
    'Content-Type': 'application/json',
    authorization: token,
  };
  const isCreated = await axios.post(
    'http://localhost:3001/admin/manage',
    user,
    {
      headers,
    },
  )
    .then((result) => result)
    .catch((error) => console.log(error));
  return !isCreated;
}

export async function getAllUsers(token) {
  const allUsers = await axios.get(
    'http://localhost:3001/admin/manage',
    {}, {
      headers: {
        Authorization: { token },
      },
    },
  )
    .then((result) => result)
    .catch((error) => console.log(error));
  console.log(allUsers);
  return allUsers;
}

export async function deleteById(id) {
  const isDeleted = await axios.delete(
    `http://localhost:3001/admin/manage/:${id}`,
    {}, {
      headers: {
        Authorization: { token },
      },
    },
  )
    .then((result) => result)
    .catch((error) => console.log(error));
  console.log(isDeleted);
  return !!isDeleted;
}

export async function getSellers() {
  const sellers = await axios.get(
    'htpp://localhost:3001/seller',
  )
    .then((result) => result.data)
    .catch((error) => console.log(error));
  return sellers;
}
