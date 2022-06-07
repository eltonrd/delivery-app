import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from './CustomerContext';
import {
  localStorageCart,
} from '../utils/localStorage/localStorage';

function CustomerProvider({ children }) {
  const [cart, setCart] = useState([]);

  const contextValue = {
    cart,
    setCart,
  };

  useEffect(() => {
    const localCart = localStorageCart();

    if (localCart !== null) {
      setCart(localCart);
    }
  }, []);

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
