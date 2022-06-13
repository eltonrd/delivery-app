import React from 'react';
import BasicNavBar from './BasicNavBar';

export default function AdminNavBar() {
  const TEST_ID_PREFIX = 'customer_products__element-navbar';

  const links = [
    {
      testid: `${TEST_ID_PREFIX}-link-orders`,
      text: 'GERENCIAR USUÁRIOS',
      path: '/admin/manage',
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
