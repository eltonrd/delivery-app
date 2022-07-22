import React from 'react';
import PropTypes from 'prop-types';
import DetailsTableHead from './DetailsTableHead';
import DetailsTableRow from './DetailsTableRow';
import * as S from '../styles/customerDetailsTable';

export default function DetailsTable({ cart }) {
  return (
    <S.TableContainer>
      <S.Table>
        <DetailsTableHead />
        <S.TableBody>
          { cart.map((product, index) => (
            <DetailsTableRow
              product={ product }
              index={ index }
              key={ index }
            />
          )) }
        </S.TableBody>
      </S.Table>
    </S.TableContainer>
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
