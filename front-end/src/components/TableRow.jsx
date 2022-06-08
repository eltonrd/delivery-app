import React from 'react';
import PropTypes from 'prop-types';
import priceToReal from '../utils/helpers/priceToReal';

export default function TableRow({ product, index }) {
  const { id, name, price, qty } = product;
  const unitPrice = parseFloat(price);
  const totalPrice = unitPrice * parseInt(qty, 10);

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${id}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${id}` }
      >
        { name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${id}` }
      >
        { qty }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${id}` }
      >
        { priceToReal(unitPrice, true) }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${id}` }
      >
        { priceToReal(totalPrice, true) }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${id}` }
      >
        Remover
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    qty: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
