const products = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    SaleProduct: { quantity: 2 },
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    SaleProduct: { quantity: 3 },
  },
];

const sellerOrders = [
  {
    deliveryAddress: 'Address One',
    deliveryNumber: '1',
    id: 1,
    saleDate: '2022-06-14T21:35:32.000Z',
    sellerId: 2,
    status: 'Pendente',
    totalPrice: '9.70',
    userId: 4,
  },
  {
    deliveryAddress: 'Address Two',
    deliveryNumber: '2',
    id: 2,
    saleDate: '2022-06-15T21:35:32.000Z',
    sellerId: 2,
    status: 'Pendente',
    totalPrice: '15.58',
    userId: 4,
  },
];

const sellerOrderDetails = {
  deliveryAddress: 'Rua abc',
  deliveryNumber: '28633',
  id: 1,
  products,
  saleDate: '2022-06-16T13:33:25.000Z',
  sellerId: 2,
  status: 'Pendente',
  totalPrice: '26.90',
  userId: 4,
};

const customerOrders = [
  {
    id: 1,
    saleDate: '2022-06-14T21:35:32.000Z',
    sellerId: 2,
    status: 'Pendente',
    totalPrice: '9.70',
    userId: 4,
  },
  {
    id: 2,
    saleDate: '2022-06-15T21:35:32.000Z',
    sellerId: 2,
    status: 'Pendente',
    totalPrice: '15.58',
    userId: 4,
  },
];

const customerOrderDetails = {
  deliveryAddress: 'Rua teste',
  deliveryNumber: '51',
  id: 1,
  products,
  saleDate: '2022-06-17T17:41:24.000Z',
  seller: { name: 'Fulana Pereira' },
  sellerId: 2,
  status: 'Pendente',
  totalPrice: '26.90',
  userId: 7,
};

const orderToBeCreated = {
  deliveryAddress: 'Rua teste',
  deliveryNumber: '51',
  products,
  sellerId: 2,
  totalPrice: 19.4,
};

export default {
  customerOrderDetails,
  sellerOrderDetails,
  sellerOrders,
  customerOrders,
  orderToBeCreated,
};
