import React, { useContext } from 'react';
import CustomerContext from '../context/CustomerContext';
import AddressForm from '../components/AddressForm';
import priceToReal from '../utils/helpers/priceToReal';
import totalPrice from '../utils/helpers/totalPrice';
import CheckoutTable from '../components/CheckoutTable';
import CustomerNavBar from '../components/CustomerNavBar';
import * as S from '../styles/checkout';

export default function Checkout() {
  const { cart } = useContext(CustomerContext);

  const getTotalPrice = () => {
    const price = totalPrice(cart);
    return priceToReal(price);
  };

  return (
    <>
      <CustomerNavBar />
      <S.Container>
        <S.OrderTitle>Finalizar Pedido</S.OrderTitle>
        <S.TableContainer>
          <CheckoutTable />
          <S.OrderTotal>
            Total: R$
            <span
              data-testid="customer_checkout__element-order-total-price"
            >
              { getTotalPrice() }
            </span>
          </S.OrderTotal>
        </S.TableContainer>
      </S.Container>
      <AddressForm />
    </>
  );
}
