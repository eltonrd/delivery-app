import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { localStorageUser } from '../utils/localStorage/localStorage';
import {
  getSellerOrderById,
  markAsDispatched,
  markAsPreparing,
} from '../utils/api/service';
import priceToReal from '../utils/helpers/priceToReal';
import totalPrice from '../utils/helpers/totalPrice';
import SellerNavBar from '../components/SellerNavBar';
import SellerDetailsTable from '../components/SellerDetailsTable';
import * as S from '../styles/sellerOrderDetails';

export default function SellerOrderDetail() {
  const [order, setOrder] = useState({});
  const [showTable, setShowTable] = useState(false);
  const { token } = localStorageUser();
  const { id } = useParams();

  const getOrderInfo = async () => {
    const apiResponse = await getSellerOrderById(token, id);
    if (!apiResponse) {
      return setShowTable(false);
    }
    setOrder(apiResponse);
    return setShowTable(true);
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  const TEST_ID_PREFIX = 'seller_order_details__element-order-details-label-';

  const formatProducts = () => order.products
    .map(({ id: productId, name, price, SaleProduct: { quantity } }) => (
      { id: productId, name, price, qty: quantity }
    ));

  const getTotalPrice = () => {
    const formattedProducts = formatProducts();
    const price = totalPrice(formattedProducts);
    return priceToReal(price);
  };

  const preparing = async () => {
    await markAsPreparing(token, order.id);
    getOrderInfo();
  };

  const dispatch = async () => {
    await markAsDispatched(token, order.id);
    getOrderInfo();
  };

  return (
    <>
      <SellerNavBar />
      <S.Details>Detalhe do Pedido</S.Details>
      <section>
        {
          showTable
          && (
            <S.OrderContainer>
              <S.LeftSide>
                <span data-testid={ `${TEST_ID_PREFIX}order-id` }>
                  { `Id: ${order.id}` }
                </span>
                <span data-testid={ `${TEST_ID_PREFIX}order-date` }>
                  { format(new Date(order.saleDate), 'dd/MM/yyyy') }
                </span>
                <span data-testid={ `${TEST_ID_PREFIX}delivery-status` }>
                  { order.status }
                </span>
                <S.Button
                  data-testid="seller_order_details__button-preparing-check"
                  disabled={ order.status !== 'Pendente' }
                  onClick={ preparing }
                  type="button"
                >
                  PREPARAR PEDIDO
                </S.Button>
                <S.Button
                  data-testid="seller_order_details__button-dispatch-check"
                  disabled={ order.status !== 'Preparando' }
                  onClick={ dispatch }
                  type="button"
                >
                  SAIU PARA ENTREGA
                </S.Button>
              </S.LeftSide>
              <SellerDetailsTable cart={ order.products } />
              <S.Price>
                Total: R$
                <span
                  data-testid="seller_order_details__element-order-total-price"
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
