import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from './CustomerContext';
import { localStorageCart, setLocalStorageCart } from '../utils/localStorage/localStorage';

function CustomerProvider({ children }) {
  const [cart, setCart] = useState([]);

  const contextValue = {
    cart,
    setCart,
  };

  useEffect(() => {
    const localCart = localStorageCart();

    if (cart.length === 0 && localCart.length !== 0) {
      setCart(localCart);
    } else {
      setLocalStorageCart(cart);
    }
  }, [cart]);

  return (
    <CustomerContext.Provider value={ contextValue }>
      { children }
    </CustomerContext.Provider>
  );
}

export default CustomerProvider;

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
