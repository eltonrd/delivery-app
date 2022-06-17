jest.mock('../utils/api/service');

import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SellerOrders from '../pages/SellerOrders';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';
import { sellerOrders } from './mocks/orders';

const { user, token } = userMock.seller;
const localStorageSeller = { ...user, token };

describe('Seller Orders page', () => {
  afterEach(() => jest.resetAllMocks());

  describe('nav bar', () => {
    let history;

    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(localStorageSeller));
      history = renderWithRouter(<SellerOrders />).history;
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });
    
    it('should have the expected elements', () => {
      const ordersLink = screen.getByRole('link', { name: /pedidos/i});
      const nameHeading = screen.getByRole('heading', { name: userMock.seller.user.name });
      const logoutButton = screen.getByRole('button', { name: /sair/i});
      
      expect(ordersLink).toBeInTheDocument();
      expect(nameHeading).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });

    describe('link to orders', () => {
      it('should redirect to /seller/orders', () => {
        history.push = jest.fn();
        const ordersLink = screen.getByRole('link', { name: /pedidos/i});
        userEvent.click(ordersLink);

        expect(history.push).toBeCalledWith({
            hash: '',
            pathname: '/seller/orders',
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
        service.getSellerOrders.mockImplementation(() => Promise.resolve(sellerOrders));
        localStorage.setItem('user', JSON.stringify(localStorageSeller));
        await act(async () => {
          history = renderWithRouter(<SellerOrders />).history;
        });
      });
      
      afterEach(() => {
        localStorage.removeItem('user');
      });
  
      it('should call service.getSellerOrders', () => {
        expect(service.getSellerOrders).toHaveBeenCalledTimes(1);
      });
  
      it('should call service.getSellerOrders with user token', () => {
        expect(service.getSellerOrders)
        .toHaveBeenCalledWith(localStorageSeller.token);
      });
  
      it('should have the expected elements', () => {
        const ordersId = screen.getAllByTestId(/seller_orders__element-order-id/i);
        const ordersStatus = screen.getAllByTestId(/seller_orders__element-delivery-status/i);
        const ordersDate = screen.getAllByTestId(/seller_orders__element-order-date/i);
        const ordersPrice = screen.getAllByTestId(/seller_orders__element-card-price/i);
        const ordersAddress = screen.getAllByTestId(/seller_orders__element-card-address/i);
  
        const ordersElements = [
          ...ordersId,
          ...ordersStatus,
          ...ordersDate,
          ...ordersPrice,
          ...ordersAddress,
        ];
  
        ordersElements.forEach((element) => {
          expect(element).toBeInTheDocument();
        });
        
        expect(ordersId).toHaveLength(2);
        expect(ordersStatus).toHaveLength(2);
        expect(ordersDate).toHaveLength(2);
        expect(ordersPrice).toHaveLength(2);
        expect(ordersAddress).toHaveLength(2);
      });

      it('should redirect to /seller/orders/:id when clicking in order card', () => {
        history.push = jest.fn();

        const ordersId = screen.getAllByTestId(/seller_orders__element-order-id/i);

        userEvent.click(ordersId[0]);

        expect(history.push).toBeCalledWith({
          hash: '',
          pathname: `/seller/orders/${sellerOrders[0].id}`,
          search: '',
        }, undefined);
      });
    });

    describe('if there is none,', () => {
      let history;
      
      beforeEach(async () => {
        service.getSellerOrders.mockImplementation(() => Promise.resolve([]));
        localStorage.setItem('user', JSON.stringify(localStorageSeller));
        await act(async () => {
          history = renderWithRouter(<SellerOrders />).history;
        });
      });
      
      afterEach(() => {
        localStorage.removeItem('user');
      });
  
      it('should call service.getSellerOrders', () => {
        expect(service.getSellerOrders).toHaveBeenCalledTimes(1);
      });
  
      it('should call service.getSellerOrders with user email and password', () => {
        expect(service.getSellerOrders)
        .toHaveBeenCalledWith(localStorageSeller.token);
      });
  
      it('should not have orders elements', () => {
        const ordersId = screen.queryAllByTestId(/seller_orders__element-order-id/i);
        const ordersStatus = screen.queryAllByTestId(/seller_orders__element-delivery-status/i);
        const ordersDate = screen.queryAllByTestId(/seller_orders__element-order-date/i);
        const ordersPrice = screen.queryAllByTestId(/seller_orders__element-card-price/i);
        const ordersAddress = screen.queryAllByTestId(/seller_orders__element-card-address/i);
        
        expect(ordersId).toHaveLength(0);
        expect(ordersStatus).toHaveLength(0);
        expect(ordersDate).toHaveLength(0);
        expect(ordersPrice).toHaveLength(0);
        expect(ordersAddress).toHaveLength(0);
      });
    });
  });
});
