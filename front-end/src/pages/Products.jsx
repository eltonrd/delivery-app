import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../utils/api/service';
import { useLocalStorage } from '../utils/localStorage/localStorage';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [user] = useLocalStorage('user', { name: 'Visitante' });
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
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </li>
            <a
              data-testid="customer_products__element-navbar-link-orders"
              href="/customer/orders"
            >
              Pedidos
            </a>
            <li
              data-testid="customer_products__element-navbar-user-full-name"
            >
              {user.name || 'Visitante'}
            </li>
            <button
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ logout }
              type="button"
            >
              Logout
            </button>
          </ul>
        </nav>
      </header>
      <section>
        { products.map((product) => (
          <ProductCard product={ product } key={ `${product.name}-${product.id}` } />
        )) }
      </section>
    </div>
  );
}
