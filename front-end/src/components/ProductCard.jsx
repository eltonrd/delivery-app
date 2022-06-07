import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import CustomerContext from '../context/CustomerContext';
import { setLocalStorageCart } from '../utils/localStorage/localStorage';

export default function ProductCard({ product }) {
  const { id, name, urlImage, price } = product;
  const { cart, setCart } = useContext(CustomerContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = { id, name, price };

    if (cart.length === 0) {
      if (quantity > 0) {
        setCart([{ ...item, qty: quantity }]);
      }
    } else {
      const index = cart.findIndex((cartProduct) => cartProduct.id === id);
      const notFound = -1;
      if (index === notFound) {
        if (quantity > 0) {
          setCart([...cart, { ...item, qty: quantity }]);
          setLocalStorageCart([...cart, { ...item, qty: quantity }]);
        }
      } else {
        cart[index].qty = quantity;
        setCart([...cart]);
        setLocalStorageCart([...cart]);
      }
    }
  }, [quantity]);

  const addToCart = () => {
    setQuantity(quantity + 1);
  };

  const removeFromCart = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantity = ({ target: { value } }) => {
    setQuantity(value);
  };

  return (
    <div>
      <img
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        width={ 50 }
      />
      <span
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </span>
      <p>
        R$
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `${price}`.replace('.', ',') }
        </span>
      </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ removeFromCart }
      >
        -
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ handleQuantity }
        placeholder="0"
        type="number"
        value={ quantity }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ addToCart }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    urlImage: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};
