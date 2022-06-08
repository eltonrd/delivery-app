import React from 'react';
import PropTypes from 'prop-types';

export default function OrderCard({ order }) {
  return (
    <div>
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
          { order.saleDate }
        </p>
        <p
          data-testid={ `customer_orders__element-card-price-${order.id}` }
        >
          { order.totalPrice }
        </p>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.instanceOf(Date),
    totalPrice: PropTypes.number,
  }).isRequired,
};
