import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/api/service';
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';
import CustomerNavBar from '../components/CustomerNavBar';
import { ProductSection } from '../styles/productCard';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const apiProducts = await getProducts();

      if (Array.isArray(apiProducts)) {
        setProducts(apiProducts);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <CustomerNavBar />
      <ProductSection>
        { products.map((product) => (
          <ProductCard product={ product } key={ `${product.name}-${product.id}` } />
        )) }
      </ProductSection>
      <CartButton />
    </div>
  );
}
