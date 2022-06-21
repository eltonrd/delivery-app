jest.mock('../utils/api/service');

import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomerOrders from '../pages/CustomerOrders';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';
import orders from './mocks/orders';

const { user, token } = userMock.customer;
const localStorageCustomer = { ...user, token };

describe('Customer orders page', () => {
  afterEach(() => jest.resetAllMocks());

  describe('nav bar', () => {
    let history;

    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(localStorageCustomer));
      history = renderWithRouter(<CustomerOrders />).history;
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });
    
    it('should have the expected elements', () => {
      const productsLink = screen.getByRole('link', {  name: /produtos/i});
      const ordersLink = screen.getByRole('link', { name: /pedidos/i});
      const nameHeading = screen.getByRole('heading', { name: userMock.customer.user.name });
      const logoutButton = screen.getByRole('button', { name: /sair/i});
      
      expect(productsLink).toBeInTheDocument();
      expect(ordersLink).toBeInTheDocument();
      expect(nameHeading).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });

    describe('link to products', () => {
      it('should redirect to /customer/products', () => {
        history.push = jest.fn();
        const productsLink = screen.getByRole('link', { name: /produtos/i});
        userEvent.click(productsLink);

        expect(history.push).toBeCalledWith({
            hash: '',
            pathname: '/customer/products',
            search: '',
        }, undefined);
      });
    });

    describe('link to orders', () => {
      it('should redirect to /customer/orders', () => {
        history.push = jest.fn();
        const ordersLink = screen.getByRole('link', { name: /pedidos/i});
        userEvent.click(ordersLink);

        expect(history.push).toBeCalledWith({
            hash: '',
            pathname: '/customer/orders',
            search: '',
        }, undefined);
      });
    });

    describe('logout button', () => {
      it('should clear localStorage', () => {
        const logoutButton = screen.getByRole('button', { name: /sair/i});
        userEvent.click(logoutButton);

        expect(localStorage.getItem('user')).toBe(null);
        expect(localStorage.getItem('carrinho')).toBe(null);
      });

      it('should redirect to /login', () => {
        const logoutButton = screen.getByRole('button', { name: /sair/i});
        userEvent.click(logoutButton);

        const { pathname } = history.location;
        expect(pathname).toBe('/login');
      });
    });
  });

  describe('orders', () => {
    describe('if there is any,', () => {
      let history;
      
      beforeEach(async () => {
        service.customerOrders.mockImplementation(() => Promise.resolve(orders.customerOrders));
        localStorage.setItem('user', JSON.stringify(localStorageCustomer));
        await act(async () => {
          history = renderWithRouter(<CustomerOrders />).history;
        });
      });
      
      afterEach(() => {
        localStorage.removeItem('user');
      });
  
      it('should call service.customerOrders', () => {
        expect(service.customerOrders).toHaveBeenCalledTimes(1);
      });
  
      it('should call service.customerOrders with user token', () => {
        expect(service.customerOrders)
        .toHaveBeenCalledWith(localStorageCustomer.token);
      });
  
      it('should have the expected elements', () => {
        const ordersId = screen.getAllByTestId(/customer_orders__element-order-id/i);
        const ordersStatus = screen.getAllByTestId(/customer_orders__element-delivery-status/i);
        const ordersDate = screen.getAllByTestId(/customer_orders__element-order-date/i);
        const ordersPrice = screen.getAllByTestId(/customer_orders__element-card-price/i);
  
        const ordersElements = [
          ...ordersId,
          ...ordersStatus,
          ...ordersDate,
          ...ordersPrice,
        ];
  
        ordersElements.forEach((element) => {
          expect(element).toBeInTheDocument();
        });
        
        expect(ordersId).toHaveLength(2);
        expect(ordersStatus).toHaveLength(2);
        expect(ordersDate).toHaveLength(2);
        expect(ordersPrice).toHaveLength(2);
      });

      it('should redirect to /customer/orders/:id when clicking in order card', () => {
        history.push = jest.fn();

        const ordersId = screen.getAllByTestId(/customer_orders__element-order-id/i);

        userEvent.click(ordersId[0]);

        expect(history.push).toBeCalledWith({
          hash: '',
          pathname: `/customer/orders/${orders.sellerOrders[0].id}`,
          search: '',
        }, undefined);
      });
    });

    describe('if there is none,', () => {
      let history;
      
      beforeEach(async () => {
        service.customerOrders.mockImplementation(() => Promise.resolve());
        localStorage.setItem('user', JSON.stringify(localStorageCustomer));
        await act(async () => {
          history = renderWithRouter(<CustomerOrders />).history;
        });
      });
      
      afterEach(() => {
        localStorage.removeItem('user');
      });
  
      it('should call service.customerOrders', () => {
        expect(service.customerOrders).toHaveBeenCalledTimes(1);
      });
  
      it('should call service.customerOrders with user token', () => {
        expect(service.customerOrders)
        .toHaveBeenCalledWith(localStorageCustomer.token);
      });
  
      it('should not have orders elements', () => {
        const ordersId = screen.queryAllByTestId(/customer_orders__element-order-id/i);
        const ordersStatus = screen.queryAllByTestId(/customer_orders__element-delivery-status/i);
        const ordersDate = screen.queryAllByTestId(/customer_orders__element-order-date/i);
        const ordersPrice = screen.queryAllByTestId(/customer_orders__element-card-price/i);
        
        expect(ordersId).toHaveLength(0);
        expect(ordersStatus).toHaveLength(0);
        expect(ordersDate).toHaveLength(0);
        expect(ordersPrice).toHaveLength(0);
      });
    });
  });
});
