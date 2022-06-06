import React, { useEffect, useState } from 'react';
import useLocalStorage from '../utils/localStorage/localStorage';

export default function CartButton() {
  const [cart] = useLocalStorage('cart', []);
  const [total, setTotal] = useState(0);

  const getTotalPrice = () => {
    cart.reduce((acc, cur) => acc + (parseFloat((cur.price * cur.qty).toFixed(2))), 0)
  }

  useEffect(() => {
    const totalPrice = getTotalPrice();

    if (typeof totalPrice === 'number') {
      setTotal(totalPrice);
    }
  });

  // [
  //   {
  //     nome
  //     id
  //     price
  //     quantidade
  //   }
  // ]

  return (
    <a href="/customer/checkout">{`Ver Carrinho: R$ ${total === 0? '0,00' : total}` }</a>
  );
}
