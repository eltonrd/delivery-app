import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

const CONTENT_TYPE = 'application/json';

export async function login(email, password) {
  const user = await API.post(
    '/login',
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
  const user = await API.post(
    '/register',
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
  const fetchProducts = await API.get(
    '/customer/products',
  ).then((result) => result.data).catch((error) => console.log(error));

  return fetchProducts;
}

export async function adminRegister(user, token) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    authorization: token,
  };
  const isCreated = await API.post(
    '/admin/manage',
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
  const allUsers = await API.get(
    '/admin/manage',
    {
      headers,
    },
  )
    .then((result) => result.data)
    .catch((error) => console.log(error));
  return allUsers;
}

export async function deleteById(id, token) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    authorization: token,
  };
  await API.delete(
    `/admin/manage/${id}`,
    {
      headers,
    },
  )
    .then((result) => result.data)
    .catch((error) => console.log(error));
}

export async function customerOrders(token) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    authorization: token,
  };
  const customerOrder = await API.get(
    '/customer/orders',
    {
      headers,
    },
  ).then((result) => result.data).catch((err) => console.error(err));

  return customerOrder;
}

export async function customerOrdersById(id, token) {
  const customerOrderById = await API.get(
    `/customer/orders/${id}`,
    { headers: { authorization: token } },
  ).then((result) => result).catch((err) => console.error(err));

  return customerOrderById;
}

export async function getSellers() {
  const sellers = await API.get(
    '/seller',
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
  const createdSale = await API.post(
    '/sales',
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

  const allSales = await API.get(
    `/customer/orders/${id}`,
    {
      headers,
    },
  )
    .then((result) => (result.data))
    .catch((error) => console.log(error));

  return allSales;
}

export async function markAsDelivered(token, id) {
  const headers = {
    'Content-Type': CONTENT_TYPE,
    authorization: token,
  };
  await API.patch(
    `/seller/orders/delivered/${id}`,
    {},
    {
      headers,
    },
  )
    .catch((error) => console.log(error));
}

export async function getSellerOrders(token) {
  const sellerOrders = await API.get(
    '/seller/orders',
    { headers: { authorization: token } },
  ).then((result) => result.data).catch((err) => console.error(err));

  return sellerOrders;
}
