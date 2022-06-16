jest.mock('../utils/api/service');

import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SellerOrderDetail from '../pages/SellerOrderDetail';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';
import { sellerOrderDetails } from './mocks/orders';

const { user, token } = userMock.seller;
const localStorageSeller = { ...user, token };

describe('Seller Orders page', () => {
  afterEach(() => jest.resetAllMocks());

  describe('nav bar', () => {
    let history;

    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(localStorageSeller));
      history = renderWithRouter(<SellerOrderDetail />).history;
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

  describe('order details', () => {
    let history;
    
    beforeEach(async () => {
      service.getSellerOrderById.mockImplementation(() => Promise.resolve(sellerOrderDetails));
      localStorage.setItem('user', JSON.stringify(localStorageSeller));
      await act(async () => {
        history = renderWithRouter(<SellerOrderDetail />).history;
      });
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });

    it('should call service.getSellerOrderById', () => {
      expect(service.getSellerOrderById).toHaveBeenCalledTimes(1);
    });

    it('should have the expected elements', () => {
      const pageTitle = screen.getByRole('heading', {  name: /detalhe do pedido/i});

      const orderId = screen.getByTestId('seller_order_details__element-order-details-label-order-id');
      const orderDate = screen.getByText(/16\/06\/2022/i);
      const orderStatus = screen.getByText(/pendente/i);

      const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});
      const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

      const itemColumnHeader = screen.getByRole('columnheader', {  name: /item/i});
      const descriptionColumnHeader = screen.getByRole('columnheader', {  name: /descrição/i});
      const quantityColumnHeader = screen.getByRole('columnheader', {  name: /quantidade/i});
      const unitPriceColumnHeader = screen.getByRole('columnheader', {  name: /valor unitário/i});
      const subTotalColumnHeader = screen.getByRole('columnheader', {  name: /sub-total/i});

      const orderTotalPriceHeading = screen.getByRole('heading', {  name: /total: r\$/i});
      const orderTotalPriceSpan = screen.getByText(/26,90/i)

      expect(pageTitle).toBeInTheDocument();

      expect(orderId).toBeInTheDocument();
      expect(orderDate).toBeInTheDocument();
      expect(orderStatus).toBeInTheDocument();

      expect(preparingButton).toBeInTheDocument();
      expect(dispatchedButton).toBeInTheDocument();

      expect(itemColumnHeader).toBeInTheDocument();
      expect(descriptionColumnHeader).toBeInTheDocument();
      expect(quantityColumnHeader).toBeInTheDocument();
      expect(unitPriceColumnHeader).toBeInTheDocument();
      expect(subTotalColumnHeader).toBeInTheDocument();

      expect(orderTotalPriceHeading).toBeInTheDocument();
      expect(orderTotalPriceSpan).toBeInTheDocument();
    });
  });
});
