jest.mock('../utils/api/service');

import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SellerOrderDetail from '../pages/SellerOrderDetail';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';
import orders from './mocks/orders';

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
    beforeEach(async () => {
      service.getSellerOrderById.mockImplementation(() => Promise.resolve(orders.sellerOrderDetails));
      localStorage.setItem('user', JSON.stringify(localStorageSeller));
      await act(async () => {
        renderWithRouter(<SellerOrderDetail />);
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

    it('should have the expected cells in table', () => {
      const itemsNumber = screen.getAllByTestId(/seller_order_details__element-order-table-item-number/);

      expect(itemsNumber).toHaveLength(2);
      expect(itemsNumber[0].innerHTML).toBe('1');
      expect(itemsNumber[1].innerHTML).toBe('2');

      const names = screen.getAllByTestId(/seller_order_details__element-order-table-name/);

      expect(names).toHaveLength(2);
      expect(names[0].innerHTML).toBe('Skol Lata 250ml');
      expect(names[1].innerHTML).toBe('Heineken 600ml');

      const quantities = screen.getAllByTestId(/seller_order_details__element-order-table-quantity/);

      expect(quantities).toHaveLength(2);
      expect(quantities[0].innerHTML).toBe('2');
      expect(quantities[1].innerHTML).toBe('3');

      const unitPrices = screen.getAllByTestId(/seller_order_details__element-order-table-unit-price/);

      expect(unitPrices).toHaveLength(2);
      expect(unitPrices[0].innerHTML).toBe('R$ 2,20');
      expect(unitPrices[1].innerHTML).toBe('R$ 7,50');

      const subTotalPrices = screen.getAllByTestId(/seller_order_details__element-order-table-sub-total/);

      expect(subTotalPrices).toHaveLength(2);
      expect(subTotalPrices[0].innerHTML).toBe('R$ 4,40');
      expect(subTotalPrices[1].innerHTML).toBe('R$ 22,50');
    });
  });

  describe('buttons', () => {
    beforeEach(async () => {
      localStorage.setItem('user', JSON.stringify(localStorageSeller));
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });
    
    describe('when order is pending', () => {
      beforeEach(async () => {
        service.getSellerOrderById.mockImplementation(() => Promise.resolve(orders.sellerOrderDetails));
        await act(async () => {
          renderWithRouter(<SellerOrderDetail />);
        });
      });

      it('prepare button should be enabled', () => {
        const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});

        expect(preparingButton).not.toBeDisabled();
      });

      it('dispatch button should be disabled', () => {
        const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

        expect(dispatchedButton).toBeDisabled();
      });

      it('clicking on prepare button should call service.markAsPreparing', async () => {
        const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});

        await act(async () => {
          userEvent.click(preparingButton);
        });

        expect(service.markAsPreparing).toHaveBeenCalledTimes(1);
      });

      it('clicking on prepare button should change order status', async () => {
        const orderStatus = screen.queryByText(/pendente/i);

        expect(orderStatus).toBeInTheDocument();

        const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});

        service.getSellerOrderById.mockImplementationOnce(() => Promise.resolve({ ...orders.sellerOrderDetails, status: 'Preparando' }));

        await act(async () => {
          userEvent.click(preparingButton);
        });
        
        expect(orderStatus.innerHTML).toBe('Preparando');
      });

      it('clicking on prepare button should disable it', async () => {
        const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});

        service.getSellerOrderById.mockImplementationOnce(() => Promise.resolve({ ...orders.sellerOrderDetails, status: 'Preparando' }));

        await act(async () => {
          userEvent.click(preparingButton);
        });
        
        expect(preparingButton).toBeDisabled();
      });

      it('clicking on prepare button should enable dispatched button', async () => {
        const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});

        const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

        expect(dispatchedButton).toBeDisabled();

        service.getSellerOrderById.mockImplementationOnce(() => Promise.resolve({ ...orders.sellerOrderDetails, status: 'Preparando' }));

        await act(async () => {
          userEvent.click(preparingButton);
        });
        
        expect(dispatchedButton).not.toBeDisabled();
      });
    });

    describe('when order is being prepared', () => {
      beforeEach(async () => {
        service.getSellerOrderById.mockImplementation(() => Promise.resolve({ ...orders.sellerOrderDetails, status: 'Preparando' }));
        await act(async () => {
          renderWithRouter(<SellerOrderDetail />);
        });
      });

      it('prepare button should be disabled', () => {
        const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});

        expect(preparingButton).toBeDisabled();
      });

      it('dispatch button should be enabled', () => {
        const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

        expect(dispatchedButton).not.toBeDisabled();
      });

      it('clicking on dispatch button should call service.markAsDispatched', async () => {
        const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

        await act(async () => {
          userEvent.click(dispatchedButton);
        });

        expect(service.markAsDispatched).toHaveBeenCalledTimes(1);
      });

      it('clicking on dispatch button should change order status', async () => {
        const orderStatus = screen.queryByText(/preparando/i);

        expect(orderStatus).toBeInTheDocument();

        const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

        service.getSellerOrderById.mockImplementationOnce(() => Promise.resolve({ ...orders.sellerOrderDetails, status: 'Em Trânsito' }));

        await act(async () => {
          userEvent.click(dispatchedButton);
        });
        
        expect(orderStatus.innerHTML).toBe('Em Trânsito');
      });

      it('clicking on dispatch button should disable it', async () => {
        const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

        service.getSellerOrderById.mockImplementationOnce(() => Promise.resolve({ ...orders.sellerOrderDetails, status: 'Em Trânsito' }));

        await act(async () => {
          userEvent.click(dispatchedButton);
        });
        
        expect(dispatchedButton).toBeDisabled();
      });

      it('clicking on dispatch button should not disable prepare button', async () => {
        const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});

        const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

        expect(preparingButton).toBeDisabled();

        service.getSellerOrderById.mockImplementationOnce(() => Promise.resolve({ ...orders.sellerOrderDetails, status: 'Em Trânsito' }));

        await act(async () => {
          userEvent.click(dispatchedButton);
        });
        
        expect(preparingButton).toBeDisabled();
      });
    });

    describe('when order is already dispatched', () => {
      beforeEach(async () => {
        service.getSellerOrderById.mockImplementation(() => Promise.resolve({ ...orders.sellerOrderDetails, status: 'Em Trânsito' }));
        await act(async () => {
          renderWithRouter(<SellerOrderDetail />);
        });
      });

      it('prepare button should be disabled', () => {
        const preparingButton = screen.getByRole('button', {  name: /preparar pedido/i});

        expect(preparingButton).toBeDisabled();
      });

      it('dispatch button should be disabled', () => {
        const dispatchedButton = screen.getByRole('button', {  name: /saiu para entrega/i});

        expect(dispatchedButton).toBeDisabled();
      });
    });
  });
});
