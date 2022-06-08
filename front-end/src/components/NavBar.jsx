import React from 'react';
import { useLocation } from 'react-router-dom';
import { localStorageUser } from '../utils/localStorage/localStorage';

export default function NavBar() {
  const { pathname } = useLocation();

  function navBarOptions() {
    const { name } = localStorageUser();
    if (pathname.includes('admin')) {
      return (
        <ul>
          <li data-testid="customer_products__element-navbar-link-orders">
            GERENCIAR USUÁRIOS
          </li>
          <li data-testid="customer_products__element-navbar-user-full-name">{ name }</li>
          <li data-testid="customer_products__element-navbar-link-logout">SAIR</li>
        </ul>
      );
    } if (pathname.includes('customer')) {
      return (
        <ul>
          <li data-testid="customer_products__element-navbar-link-products">PRODUTOS</li>
          <li data-testid="customer_products__element-navbar-link-orders">
            MEUS PEDIDOS
          </li>
          <li data-testid="customer_products__element-navbar-user-full-name">{ name }</li>
          <li data-testid="customer_products__element-navbar-link-logout">SAIR</li>
        </ul>
      );
    } if (pathname.includes('seller')) {
      return (
        <ul>
          <li data-testid="customer_products__element-navbar-link-orders">PEDIDOS</li>
          <li data-testid="customer_products__element-navbar-user-full-name">{ name }</li>
          <li data-testid="customer_products__element-navbar-link-logout">SAIR</li>
        </ul>
      );
    }
  }

  return (
    <nav>
      { navBarOptions() }
    </nav>
  );
}
