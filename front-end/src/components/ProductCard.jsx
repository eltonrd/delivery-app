import PropTypes from 'prop-types';
import React from 'react';

export default function ProductCard({ product }) {
  const {id, name, urlImage, price } = product;
  return (
    <div>
      <img src={urlImage} width={50} alt={name} data-testid={`customer_products__img-card-bg-image-${id}`} />
      <span data-testid={`customer_products__element-card-title-${id}`}>{name}</span>
      <span data-testid={`customer_products__element-card-price-${id}`}>{`R$ ${price}`}</span>
      <button type="button" data-testid={`customer_products__button-card-rm-item-${id}`}>-</button>
      <input data-testid={`customer_products__input-card-quantity-${id}`} type="text" />
      <button type="button" data-testid={`customer_products__button-card-add-item-${id}`}>+</button>
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
