import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CustomerContext from '../context/CustomerContext';

export default function ProductCard({ product }) {
  const { id, name, urlImage, price } = product;
  const { cart, setCart } = useContext(CustomerContext);

  const addToCart = () => {
    setCart([{ id, name, price, qty: 1 }]);
  }

  const removeFromCart = () => {
    return null;
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
