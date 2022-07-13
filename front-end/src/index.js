import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import Provider from './context/Provider';
import CustomerProvider from './context/CustomerProvider';

ReactDOM.render(
  <Provider>
    <CustomerProvider>
      <BrowserRouter>
        <App />
        <ToastContainer autoClose={ 4000 } />
      </BrowserRouter>
    </CustomerProvider>
  </Provider>,
  document.getElementById('root'),
);
