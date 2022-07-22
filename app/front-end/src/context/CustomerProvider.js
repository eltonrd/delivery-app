import React from 'react';
import PropTypes from 'prop-types';
import CustomerContext from './CustomerContext';
import {
  useLocalStorage,
} from '../utils/localStorage/localStorage';

function CustomerProvider({ children }) {
  const [cart, setCart] = useLocalStorage('carrinho', []);

  const contextValue = {
    cart,
    setCart,
  };

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
