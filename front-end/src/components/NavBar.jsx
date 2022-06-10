import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { localStorageUser, removeFromLocalStorage } from '../utils/localStorage/localStorage';

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    removeFromLocalStorage('user');
    removeFromLocalStorage('carrinho');
    navigate('/login');
  };

  function navBarOptions() {
    const { name } = localStorageUser();
    if (pathname.includes('admin')) {
      return (
        <ul>
          <li data-testid="customer_products__element-navbar-link-orders">
            GERENCIAR USUÁRIOS
          </li>
          <li data-testid="customer_products__element-navbar-user-full-name">{ name }</li>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logout }
          >
            SAIR
          </button>
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
          <button
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logout }
          >
            SAIR
          </button>
        </ul>
      );
    } if (pathname.includes('seller')) {
      return (
        <ul>
          <li data-testid="customer_products__element-navbar-link-orders">PEDIDOS</li>
          <li data-testid="customer_products__element-navbar-user-full-name">{ name }</li>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logout }
          >
            SAIR
          </button>
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
