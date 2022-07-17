import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { localStorageUser } from '../utils/localStorage/localStorage';
import DetailsTable from '../components/DetailsTable';
import { getCustomerOrderById, markAsDelivered } from '../utils/api/service';
import priceToReal from '../utils/helpers/priceToReal';
import totalPrice from '../utils/helpers/totalPrice';
import CustomerNavBar from '../components/CustomerNavBar';
import * as S from '../styles/customerOrderDetails';

export default function CustomerOrderDetail() {
  const [order, setOrder] = useState({});
  const [showTable, setShowTable] = useState(false);
  const { token } = localStorageUser();
  const { id } = useParams();

  const getOrderInfo = async () => {
    const apiResponse = await getCustomerOrderById(token, id);
    if (!apiResponse) {
      return setShowTable(false);
    }
    setOrder(apiResponse);
    return setShowTable(true);
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  const data = 'customer_order_details__element-order-details-label-';

  const delivered = async () => {
    await markAsDelivered(token, order.id);
    getOrderInfo();
  };

  const formatProducts = () => order.products
    .map(({ id: productId, name, price, SaleProduct: { quantity } }) => (
      { id: productId, name, price, qty: quantity }
    ));

  const getTotalPrice = () => {
    const formattedProducts = formatProducts();
    const price = totalPrice(formattedProducts);
    return priceToReal(price);
  };

  return (
    <>
      <CustomerNavBar />
      <S.Details>Detalhe do Pedido</S.Details>
      <section>
        {
          showTable
          && (
            <S.OrderContainer>
              <S.CompanyInfo>
                <S.OrderId data-testid={ `${data}order-id` }>
                  { `Pedido ${order.id}` }
                </S.OrderId>
                <div data-testid={ `${data}seller-name` }>
                  { order.seller.name }
                </div>
                <div data-testid={ `${data}order-date` }>
                  { format(new Date(order.saleDate), 'dd/MM/yyyy') }
                </div>
                <div data-testid={ `${data}delivery-status` }>
                  { order.status }
                </div>
                <S.DeliveryButton
                  data-testid="customer_order_details__button-delivery-check"
                  disabled={ order.status !== 'Em Trânsito' }
                  onClick={ delivered }
                  type="button"
                >
                  Marcar como entregue
                </S.DeliveryButton>
              </S.CompanyInfo>
              <DetailsTable cart={ order.products } />
              <S.Price>
                Total: R$
                <span
                  data-testid="customer_order_details__element-order-total-price"
                >
                  { getTotalPrice() }
                </span>
              </S.Price>
            </S.OrderContainer>
          )
        }
      </section>
    </>
  );
}
