import React, { useContext } from 'react';
import CustomerContext from '../context/CustomerContext';
import AddressForm from '../components/AddressForm';
import priceToReal from '../utils/helpers/priceToReal';
import totalPrice from '../utils/helpers/totalPrice';
import CheckoutTable from '../components/CheckoutTable';
import CustomerNavBar from '../components/CustomerNavBar';

export default function Checkout() {
  const { cart } = useContext(CustomerContext);

  const getTotalPrice = () => {
    const price = totalPrice(cart);
    return priceToReal(price);
  };

  return (
    <div>
      <CustomerNavBar />
      <section>
        <h1>Finalizar Pedido</h1>
        <CheckoutTable />
        <h1>
          Total: R$
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            { getTotalPrice() }
          </span>
        </h1>
      </section>
      <AddressForm />
    </div>
  );
}
