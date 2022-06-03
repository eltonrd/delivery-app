import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../utils/localStorage/localStorage';

export default function Products() {
  const [user, setUser] = useLocalStorage('user', 'Convidado');
  
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li data-testid="customer_products__element-navbar-link-products">
              Produtos
            </li>
            <li data-testid="customer_products__element-navbar-link-orders">
              Pedidos
            </li>
          <li data-testid="customer_products__element-navbar-user-full-name">
              {user.name}
            </li>
            <li data-testid="customer_products__element-navbar-link-logout">
              Logout
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

//