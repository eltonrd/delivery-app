import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/api/service';
import { useLocalStorage } from '../utils/localStorage/localStorage';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [user, setUser] = useLocalStorage('user', { name: 'Visitante' });
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(async () => {
    const products = await getProducts(); 

    if (!products) {
    } else {
      setProducts(products);
    }
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
            <li
              data-testid="customer_products__element-navbar-link-orders"
              onClick={() => navigate('/customer/orders')}
            >
              Pedidos
            </li>
            <li
              data-testid="customer_products__element-navbar-user-full-name"
            >
              {user.name}
            </li>
            <li
              data-testid="customer_products__element-navbar-link-logout"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        </nav>
      </header>
      <section>
        { products.map((product) => (
          <ProductCard product={product} key={`${product.name}-${product.id}`} />
        )) }
      </section>
    </div>
  );
}
