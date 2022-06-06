import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from './CustomerContext';

function CustomerProvider({ children }) {
  const [cart, setCart] = useState([]);

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
