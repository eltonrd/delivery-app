import React, { useEffect, useState, useContext } from 'react';
import CustomerContext from '../context/CustomerContext';

export default function CartButton() {
  const { cart } = useContext(CustomerContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalPrice = () => {
      const price = cart.reduce((acc, cur) => acc + (cur.price * cur.qty), 0);
      setTotal(price.toFixed(2));
    };

    getTotalPrice();
  }, [cart]);

  return (
    <a
      href="/customer/checkout"
      data-testid="customer_products__checkout-bottom-value"
    >
      { `Ver Carrinho: R$ ${total === 0 ? '0.00' : total}` }
    </a>
  );
}
