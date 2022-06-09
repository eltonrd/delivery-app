import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';
import priceToReal from '../utils/helpers/priceToReal';
import totalPrice from '../utils/helpers/totalPrice';

export default function CartButton() {
  const { cart } = useContext(CustomerContext);
  const [total, setTotal] = useState('0');

  const navigate = useNavigate();

  useEffect(() => {
    const getTotalPrice = () => {
      const price = totalPrice(cart);
      setTotal(priceToReal(price));
    };

    getTotalPrice();
  }, [cart]);

  return (
    <button
      data-testid="customer_products__button-cart"
      disabled={ cart.length === 0 }
      onClick={ () => navigate('/customer/checkout') }
      type="button"
    >
      Ver Carrinho: R$
      <span
        data-testid="customer_products__checkout-bottom-value"
      >
        { total }
      </span>
    </button>
  );
}
