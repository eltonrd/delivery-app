jest.mock('../utils/api/service');

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SellerOrders from '../pages/SellerOrders';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';

describe('Seller Orders page', () => {
  describe('nav bar', () => {
    it('should have the expected elements', () => {
      localStorage.setItem('user', JSON.stringify({ name: userMock.seller.user.name }));      renderWithRouter(<SellerOrders />);

      const ordersLink = screen.getByRole('link', { name: /pedidos/i});
      const nameHeading = screen.getByRole('heading', { name: userMock.seller.user.name });
      const logoutButton = screen.getByRole('button', { name: /sair/i});

      expect(ordersLink).toBeInTheDocument();
      expect(nameHeading).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });
  });
});
