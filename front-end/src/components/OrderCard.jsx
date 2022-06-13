import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import priceToReal from '../utils/helpers/priceToReal';

export default function OrderCard({ order }) {
  return (
    <Link to={ `/customer/orders/${order.id}` }>
      <p>
        Pedido
        <span
          data-testid={ `customer_orders__element-order-id-${order.id}` }
        >
          { order.id }
        </span>
      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${order.id}` }
      >
        { order.status }
      </p>
      <div>
        <p
          data-testid={ `customer_orders__element-order-date-${order.id}` }
        >
          { format(new Date(order.saleDate), 'dd/MM/yyyy') }
        </p>
        <p
          data-testid={ `customer_orders__element-card-price-${order.id}` }
        >
          { priceToReal(order.totalPrice, true) }
        </p>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
  }).isRequired,
};
