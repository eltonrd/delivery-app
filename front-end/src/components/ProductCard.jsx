import PropTypes from 'prop-types';
import React from 'react';

export default function ProductCard({ product }) {
  const { id, name, urlImage, price } = product;
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
        type="text"
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
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
