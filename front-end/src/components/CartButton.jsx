import React, { useEffect, useState, useContext } from 'react';
import useLocalStorage from '../utils/localStorage/localStorage';
import CustomerContext from '../context/CustomerContext';

export default function CartButton() {
  const { cart } = useContext(CustomerContext);
  const [total, setTotal] = useState(0);

  const getTotalPrice = () => {
    const price = cart.reduce((acc, cur) => acc + ((cur.price * cur.qty).toFixed(2)), 0);
    setTotal(price);
  }

  useEffect(() => {
    const totalPrice = getTotalPrice();

    if (typeof totalPrice === 'number') {
      setTotal(totalPrice);
    }
  }, [cart]);

  return (
    <a href="/customer/checkout">{ `Ver Carrinho: R$ ${total === 0? '0.00' : total}` }</a>
  );
}
