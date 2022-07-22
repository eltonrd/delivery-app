import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import priceToReal from '../utils/helpers/priceToReal';
import * as S from '../styles/sellerOrders';

export default function SellerOrderCard({ order }) {
  return (
    <S.Link href={ `/seller/orders/${order.id}` }>
      <div>
        <p>Pedido</p>
        <span
          data-testid={ `seller_orders__element-order-id-${order.id}` }
        >
          { order.id }
        </span>
      </div>
      <div>
        <p
          data-testid={ `seller_orders__element-delivery-status-${order.id}` }
        >
          { order.status }
        </p>
      </div>
      <S.OrderInfo>
        <span
          data-testid={ `seller_orders__element-order-date-${order.id}` }
        >
          { format(new Date(order.saleDate), 'dd/MM/yyyy') }
        </span>
        <span
          data-testid={ `seller_orders__element-card-price-${order.id}` }
        >
          { priceToReal(order.totalPrice, true) }
        </span>
      </S.OrderInfo>
      <p
        data-testid={ `seller_orders__element-card-address-${order.id}` }
      >
        { `${order.deliveryAddress}, ${order.deliveryNumber}` }
      </p>
    </S.Link>
  );
}

SellerOrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
  }).isRequired,
};
