jest.mock('../utils/api/service');

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SellerOrders from '../pages/SellerOrders';
import renderWithRouter from './renderWithRouter';
import userMock from './mocks/user';

const { user, token } = userMock.seller;
const localStorageUser = { ...user, token };

describe('Seller Orders page', () => {
  describe('nav bar', () => {
    let history;

    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(localStorageUser));
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
});
