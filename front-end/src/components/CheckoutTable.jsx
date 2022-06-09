import React, { useContext } from 'react';
import CustomerContext from '../context/CustomerContext';
import CheckoutTableHead from './CheckoutTableHead';
import CheckoutTableRow from './CheckoutTableRow';

export default function CheckoutTable() {
  const { cart } = useContext(CustomerContext);

  return (
    <table>
      <CheckoutTableHead />
      <tbody>
        { cart.map((product, index) => (
          <CheckoutTableRow
            product={ product }
            index={ index }
            key={ index }
          />
        )) }
      </tbody>
    </table>
  );
}
