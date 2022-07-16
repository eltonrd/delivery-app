import React, { useContext } from 'react';
import CustomerContext from '../context/CustomerContext';
import CheckoutTableHead from './CheckoutTableHead';
import CheckoutTableRow from './CheckoutTableRow';
import { Table, TableBody } from '../styles/checkout';

export default function CheckoutTable() {
  const { cart } = useContext(CustomerContext);

  return (
    <Table>
      <CheckoutTableHead />
      <TableBody>
        { cart.map((product, index) => (
          <CheckoutTableRow
            product={ product }
            index={ index }
            key={ index }
          />
        )) }
      </TableBody>
    </Table>
  );
}
