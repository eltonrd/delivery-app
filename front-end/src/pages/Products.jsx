import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../utils/api/service';
import {
  localStorageUser,
  removeFromLocalStorage,
} from '../utils/localStorage/localStorage';
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const apiProducts = await getProducts();

      if (Array.isArray(apiProducts)) {
        setProducts(apiProducts);
      }
    }
    fetchData();
  }, []);

  const logout = () => {
    removeFromLocalStorage('user');
    navigate('/login');
  };

  return (
    <div>
      <header>
        <nav>
          <a
            data-testid="customer_products__element-navbar-link-products"
            href="/customer/products"
          >
            Produtos
          </a>
          <a
            data-testid="customer_products__element-navbar-link-orders"
            href="/customer/orders"
          >
            Pedidos
          </a>
        </nav>
        <div>
          <h1
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { localStorageUser().name }
          </h1>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logout }
            type="button"
          >
            Sair
          </button>
        </div>
      </header>
      <section>
        { products.map((product) => (
          <ProductCard product={ product } key={ `${product.name}-${product.id}` } />
        )) }
      </section>
      <CartButton />
    </div>
  );
}
