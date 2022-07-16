import React from 'react';

import { TableHead } from '../styles/checkout';

export default function CheckoutTableHead() {
  return (
    <TableHead>
      <tr>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-total</th>
        <th>Remover Item</th>
      </tr>
    </TableHead>
  );
}
