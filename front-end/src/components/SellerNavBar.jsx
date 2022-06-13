import React from 'react';
import NavBar from './NavBar';

export default function SellerNavBar() {
  const TEST_ID_PREFIX = 'customer_products__element-navbar';

  const links = [
    {
      testid: `${TEST_ID_PREFIX}-link-orders`,
      text: 'PEDIDOS',
      path: '/seller/orders',
    },
  ];

  const dataTestIds = {
    name: `${TEST_ID_PREFIX}-user-full-name`,
    button: `${TEST_ID_PREFIX}-link-logout`,
  };

  return (
    <NavBar links={ links } dataTestIds={ dataTestIds } />
  );
}
