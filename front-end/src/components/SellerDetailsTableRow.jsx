import React from 'react';
import PropTypes from 'prop-types';
import priceToReal from '../utils/helpers/priceToReal';

export default function DetailsTableRow({ product, index }) {
  const { name, price, SaleProduct: { quantity } } = product;
  const unitPrice = parseFloat(price);
  const totalPrice = unitPrice * quantity;

  const TEST_ID_PREFIX = 'seller_order_details__element-order-table';

  return (
    <tr>
      <td
        data-testid={ `${TEST_ID_PREFIX}-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `${TEST_ID_PREFIX}-name-${index}` }
      >
        { name }
      </td>
      <td
        data-testid={ `${TEST_ID_PREFIX}-quantity-${index}` }
      >
        { quantity }
      </td>
      <td
        data-testid={ `${TEST_ID_PREFIX}-unit-price-${index}` }
      >
        { priceToReal(unitPrice, true) }
      </td>
      <td
        data-testid={ `${TEST_ID_PREFIX}-sub-total-${index}` }
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
