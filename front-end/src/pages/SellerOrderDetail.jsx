import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { localStorageUser } from '../utils/localStorage/localStorage';
import { getOrderById, markAsDispatched, markAsPreparing } from '../utils/api/service';
import priceToReal from '../utils/helpers/priceToReal';
import totalPrice from '../utils/helpers/totalPrice';
import SellerNavBar from '../components/SellerNavBar';
import SellerDetailsTable from '../components/SellerDetailsTable';

export default function SellerOrderDetail() {
  const [order, setOrder] = useState({});
  const [showTable, setShowTable] = useState(false);
  const { token } = localStorageUser();
  const { id } = useParams();

  const getOrderInfo = async () => {
    const apiResponse = await getOrderById(token, id);
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
      <section>
        <h1>Detalhe do Pedido</h1>
        {
          showTable
          && (
            <div>
              <div data-testid={ `${TEST_ID_PREFIX}order-id` }>
                { order.id }
              </div>
              <div data-testid={ `${TEST_ID_PREFIX}order-date` }>
                { format(new Date(order.saleDate), 'dd/MM/yyyy') }
              </div>
              <div data-testid={ `${TEST_ID_PREFIX}delivery-status` }>
                { order.status }
              </div>
              <button
                data-testid="seller_order_details__button-preparing-check"
                disabled={ order.status !== 'Pendente' }
                onClick={ preparing }
                type="button"
              >
                PREPARAR PEDIDO
              </button>
              <button
                data-testid="seller_order_details__button-dispatch-check"
                disabled={ order.status !== 'Preparando' }
                onClick={ dispatch }
                type="button"
              >
                SAIU PARA ENTREGA
              </button>
              <SellerDetailsTable cart={ order.products } />
              <h1>
                Total: R$
                <span
                  data-testid="seller_order_details__element-order-total-price"
                >
                  { getTotalPrice() }
                </span>
              </h1>
            </div>
          )
        }
      </section>
    </>
  );
}
