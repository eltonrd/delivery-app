import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/api/service';
import { useLocalStorage } from '../utils/localStorage/localStorage';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [user, setUser] = useLocalStorage('user', 'Convidado');
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const products = await getProducts(); 

    if (!products) {
    } else {
      setProducts(products);
    }
  }, []);
  
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
      <section>
        { products.map((product) => (
          <ProductCard product={product} key={`${product.name}-${product.id}`} />
        )) }
      </section>
    </div>
  );
}
