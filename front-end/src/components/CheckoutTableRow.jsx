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
    const newCart = cart.filter((product) => product.id !== id);

    setCart(newCart);
  }

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
        <button type="button" onClick={ removeItem }>
          Remover
        </button>
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
