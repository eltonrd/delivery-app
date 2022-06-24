import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';

import App from './App';
import Provider from './context/Provider';
import CustomerProvider from './context/CustomerProvider';

import './index.css';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
