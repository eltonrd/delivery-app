import axios from 'axios';

const CONTENT_TYPE = 'application/json';

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
    'Content-Type': CONTENT_TYPE,
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
  const headers = {
    'Content-Type': CONTENT_TYPE,
    authorization: token,
  };
  const allUsers = await axios.get(
    'http://localhost:3001/admin/manage',
    {
      headers,
    },
  )
    .then((result) => result)
    .catch((error) => console.log(error));
  console.log(allUsers);
  return allUsers;
}

export async function deleteById(id) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    authorization: token,
  };
  const isDeleted = await axios.delete(
    `http://localhost:3001/admin/manage/:${id}`,
    {
      headers,
    },
  )
    .then((result) => result)
    .catch((error) => console.log(error));
  console.log(isDeleted);
  return !!isDeleted;
}

export async function getSellers() {
  const sellers = await axios.get(
    'http://localhost:3001/seller',
  )
    .then((result) => result.data)
    .catch((error) => console.log(error));
  return sellers;
}

export async function createSale(sale, token) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    authorization: token,
  };
  const createdSale = await axios.post(
    'http://localhost:3001/sales',
    sale,
    {
      headers,
    },
  )
    .then((result) => result.data)
    .catch((error) => console.log(error));

  return createdSale.id;
}

export async function getSaleById(token, id) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    authorization: token,
  };

  const allSales = await axios.get(
    `http://localhost:3001/customer/orders/${id}`,
    {
      headers,
    },
  )
    .then((result) => (result.data))
    .catch((error) => console.log(error));

  return allSales;
}

export async function markAsDelivered(token, id) {
  await axios.patch(
    `http://localhost:3001/seller/orders/delivered/${id}`,
    {},
    { headers: { authorization: token } },
  )
    .catch((error) => console.log(error));
}
