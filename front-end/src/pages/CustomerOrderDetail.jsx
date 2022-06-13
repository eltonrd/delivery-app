import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import NavBar from '../components/NavBar';
import { localStorageUser } from '../utils/localStorage/localStorage';
import DetailsTable from '../components/DetailsTable';
import { getSaleById, markAsDelivered } from '../utils/api/service';
import priceToReal from '../utils/helpers/priceToReal';
import totalPrice from '../utils/helpers/totalPrice';

export default function CustomerOrderDetail() {
  const [order, setOrder] = useState({});
  const [showTable, setShowTable] = useState(false);
  const { token } = localStorageUser();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await getSaleById(token, id);
      if (!apiResponse) {
        return setShowTable(false);
      }
      setOrder(apiResponse);
      return setShowTable(true);
    }
    fetchData();
  }, [id, token]);

  const data = 'customer_order_details__element-order-details-label-';

  const delivered = async () => {
    await markAsDelivered(token, order.id);
    async function fetchData() {
      const apiResponse = await getSaleById(token, id);
      setOrder(apiResponse);
    }
    fetchData();
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
      <NavBar />
      <section>
        <h1>Detalhe do Pedido</h1>
        {
          showTable
          && (
            <div>
              <div data-testid={ `${data}order-id` }>
                { order.id }
              </div>
              <div data-testid={ `${data}seller-name` }>
                { order.seller.name }
              </div>
              <div data-testid={ `${data}order-date` }>
                { format(new Date(order.saleDate), 'dd/MM/yyyy') }
              </div>
              <div data-testid={ `${data}delivery-status` }>
                { order.status }
              </div>
              <button
                data-testid="customer_order_details__button-delivery-check"
                disabled={ order.status !== 'Em Trânsito' }
                onClick={ delivered }
                type="button"
              >
                Marcar como entregue
              </button>
              <DetailsTable cart={ order.products } />
              <h1>
                Total: R$
                <span
                  data-testid="customer_order_details__element-order-total-price"
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
