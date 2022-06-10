import React from 'react';
import PropTypes from 'prop-types';
import priceToReal from '../utils/helpers/priceToReal';

export default function DetailsTableRow({ product, index }) {
  const { name, price, SaleProduct: { quantity } } = product;
  const unitPrice = parseFloat(price);
  const totalPrice = unitPrice * quantity;

  return (
    <tr>
      <td
        data-testid={ `customer_order_details__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-name-${index}` }
      >
        { name }
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-quantity-${index}` }
      >
        { quantity }
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-sub-total-${index}` }
      >
        { priceToReal(unitPrice, true) }
      </td>
      <td
        data-testid={ `customer_order_details__element-order-total-price-${index}` }
      >
        { priceToReal(totalPrice, true) }
      </td>
    </tr>
  );
}

DetailsTableRow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
