import React from 'react';
import BasicNavBar from './BasicNavBar';

export default function CustomerNavBar() {
  const TEST_ID_PREFIX = 'customer_products__element-navbar';

  const links = [
    {
      testid: `${TEST_ID_PREFIX}-link-products`,
      text: 'PRODUTOS',
      path: '/customer/products',
    },
    {
      testid: `${TEST_ID_PREFIX}-link-orders`,
      text: 'PEDIDOS',
      path: '/customer/orders',
    },
  ];

  const dataTestIds = {
    name: `${TEST_ID_PREFIX}-user-full-name`,
    button: `${TEST_ID_PREFIX}-link-logout`,
  };

  return (
    <BasicNavBar links={ links } dataTestIds={ dataTestIds } />
  );
}
