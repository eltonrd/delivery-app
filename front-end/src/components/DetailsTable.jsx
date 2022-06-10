import React from 'react';
import PropTypes from 'prop-types';
import DetailsTableHead from './DetailsTableHead';
import DetailsTableRow from './DetailsTableRow';

export default function DetailsTable({ cart }) {
  return (
    <table>
      <DetailsTableHead />
      <tbody>
        { cart.map((product, index) => (
          <DetailsTableRow
            product={ product }
            index={ index }
            key={ index }
          />
        )) }
      </tbody>
    </table>
  );
}

DetailsTable.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  })).isRequired,
};
