import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import priceToReal from '../utils/helpers/priceToReal';
import CustomerContext from '../context/CustomerContext';

export default function CheckoutTableRow({ product, index }) {
  const { cart, setCart } = useContext(CustomerContext);

  const { id, name, price, qty } = product;
  const unitPrice = parseFloat(price);
  const totalPrice = unitPrice * parseInt(qty, 10);

  const removeItem = () => {
    const newCart = cart.filter((cartProduct) => cartProduct.id !== id);

    setCart(newCart);
  };

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { qty }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { priceToReal(unitPrice, true) }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { priceToReal(totalPrice, true) }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
      >
        <button type="button" onClick={ removeItem }>
          Remover
        </button>
      </td>
    </tr>
  );
}

CheckoutTableRow.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    qty: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
