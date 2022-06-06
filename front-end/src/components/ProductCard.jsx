import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CustomerContext from '../context/CustomerContext';

export default function ProductCard({ product }) {
  const { id, name, urlImage, price } = product;
  const { cart, setCart } = useContext(CustomerContext);

  const addToCart = () => {
    const item = { id, name, price }
    if (cart.length === 0) {
      setCart([{ ...item, qty: 1 }]);
    } else {
      const index = cart.findIndex((product) => product.id === id);

      if (index === -1) {
        setCart([...cart, { ...item, qty: 1 }]);
      } else {
        cart[index].qty += 1;
        setCart([...cart]);
      }
    }
  }

  const removeFromCart = () => {
    const item = { id, name, price }
    if (cart.length > 0) {
      const index = cart.findIndex((product) => product.id === id);
      if (index !== -1) {
        cart[index].qty -= 1;
        if (cart[index].qty === 0) {
          cart.splice(index, 1);
        }
        setCart([...cart]);
    }
  } 
}

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
      <span
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { `R$ ${price}` }
      </span>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ removeFromCart }
      >
        -
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        placeholder="0"
        type="text"
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
