import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { localStorageUser } from '../utils/localStorage/localStorage';
import DetailsTable from '../components/DetailsTable';
import { getSaleById, markAsDelivered } from '../utils/api/service';

export default function CustomerOrderDetail() {
  const [order, setOrder] = useState({});
  const [showTable, setShowTable] = useState(false);
  const { token } = localStorageUser();
  // const [seller, setSeller] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await getSaleById(token, id);
      setOrder(apiResponse);
      if (!apiResponse) {
        return setShowTable(false);
      }
      // const s = await getSellers();
      // if (!s) {
      return setShowTable(true);
      // }
      // if (s.length > 0) {
      //   const salePerson = s.find((sell) => sell.id === order.sellerId);
      //   setSeller(salePerson.name);
      //   setShowTable(true);
      // }
    }
    fetchData();
  }, [id, token]);

  const data = 'customer_order_details__element-order-details-label-';

  const delivered = async () => markAsDelivered(token, order.id);

  return (
    <>
      <NavBar />
      <section>
        <h1>Detalhe do Pedido</h1>
        <section>
          {
            showTable
            && (
              <div>
                <div data-testid={ `${data}order-id` }>
                  { order.id }
                </div>
                {/* <div data-testid={ `${data}seller-name` }>
                  { `nome vendedor:${seller}` }
                </div> */}
                <div data-testid={ `${data}order-date` }>
                  { order.saleDate }
                </div>
                <div data-testid={ `${data}delivery-status` }>
                  { order.status }
                </div>
                <button
                  data-testid="customer_order_details__button-delivery-check"
                  type="button"
                  onClick={ delivered }
                >
                  Marcar como entregue
                </button>

                <DetailsTable cart={ order.product } />
              </div>
            )
          }
        </section>
      </section>
    </>
  );
}
