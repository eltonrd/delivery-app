import React from 'react';
import NavBar from '../components/NavBar';
import TableRow from '../components/TableRow';
import { localStorageCart } from '../utils/localStorage/localStorage';
import AdressForm from '../components/AdressForm';
import priceToReal from '../utils/helpers/priceToReal';

export default function Checkout() {
  const cart = localStorageCart();

  const getTotalPrice = () => {
    const price = cart
      .reduce(
        (acc, cur) => acc + (parseFloat(cur.price) * parseFloat(cur.qty)),
        0,
      );
    return priceToReal(price);
  };

  const tableHead = () => (
    <thead>
      <tr>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-total</th>
        <th>Remover Item</th>
      </tr>
    </thead>
  );

  return (
    <div>
      <NavBar />
      <section>
        <h1>Finalizar Pedido</h1>
        <table>
          { tableHead() }
          <tbody>
            { cart.map((product, index) => (
              <TableRow
                product={ product }
                index={ index }
                key={ index }
              />
            )) }
          </tbody>
        </table>
        <h1>
          Total: R$
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            { getTotalPrice() }
          </span>
        </h1>
      </section>
      <AdressForm />
    </div>
  );
}
