jest.mock('../utils/api/service');

import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomerOrderDetail from '../pages/CustomerOrderDetail';
import renderWithRouter from './renderWithRouter';
import * as service from '../utils/api/service';
import userMock from './mocks/user';
import orders from './mocks/orders';

const { user, token } = userMock.customer;
const localStorageCustomer = { ...user, token };

describe('Customer Orders page', () => {
  afterEach(() => jest.resetAllMocks());

  // describe('nav bar', () => {
  //   let history;

  //   beforeEach(() => {
  //     localStorage.setItem('user', JSON.stringify(localStorageCustomer));
  //     history = renderWithRouter(<CustomerOrderDetail />).history;
  //   });
    
  //   afterEach(() => {
  //     localStorage.removeItem('user');
  //   });
    
  //   it('should have the expected elements', () => {
  //     const ordersLink = screen.getByRole('link', { name: /pedidos/i});
  //     const nameHeading = screen.getByRole('heading', { name: userMock.seller.user.name });
  //     const logoutButton = screen.getByRole('button', { name: /sair/i});
      
  //     expect(ordersLink).toBeInTheDocument();
  //     expect(nameHeading).toBeInTheDocument();
  //     expect(logoutButton).toBeInTheDocument();
  //   });

  //   describe('link to orders', () => {
  //     it('should redirect to /seller/orders', () => {
  //       history.push = jest.fn();
  //       const ordersLink = screen.getByRole('link', { name: /pedidos/i});
  //       userEvent.click(ordersLink);

  //       expect(history.push).toBeCalledWith({
  //           hash: '',
  //           pathname: '/seller/orders',
  //           search: '',
  //       }, undefined);
  //     });
  //   });

  //   describe('logout button', () => {
  //     it('should clear localStorage', () => {
  //       const logoutButton = screen.getByRole('button', { name: /sair/i});
  //       userEvent.click(logoutButton);

  //       expect(localStorage.getItem('user')).toBe(null);
  //       expect(localStorage.getItem('carrinho')).toBe(null);
  //     });

  //     it('should redirect to /login', () => {
  //       const logoutButton = screen.getByRole('button', { name: /sair/i});
  //       userEvent.click(logoutButton);

  //       const { pathname } = history.location;
  //       expect(pathname).toBe('/login');
  //     });
  //   });
  // });

  describe('order details', () => {
    beforeEach(async () => {
      service.getCustomerOrderById.mockImplementation(() => Promise.resolve(orders.customerOrderDetails));
      localStorage.setItem('user', JSON.stringify(localStorageCustomer));
      await act(async () => {
        renderWithRouter(<CustomerOrderDetail />);
      });
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });

    it('should call service.getCustomerOrderById', () => {
      expect(service.getCustomerOrderById).toHaveBeenCalledTimes(1);
    });

    it('should have the expected elements', () => {
      const pageTitle = screen.getByRole('heading', {  name: /detalhe do pedido/i});

      const orderId = screen.getByTestId('customer_order_details__element-order-details-label-order-id');
      const sellerName = screen.getByText(/fulana pereira/i)
      const orderDate = screen.getByText(/17\/06\/2022/i);
      const orderStatus = screen.getByText(/pendente/i);

      const deliveredButton = screen.getByRole('button', {  name: /marcar como entregue/i});

      const itemColumnHeader = screen.getByRole('columnheader', {  name: /item/i});
      const descriptionColumnHeader = screen.getByRole('columnheader', {  name: /descrição/i});
      const quantityColumnHeader = screen.getByRole('columnheader', {  name: /quantidade/i});
      const unitPriceColumnHeader = screen.getByRole('columnheader', {  name: /valor unitário/i});
      const subTotalColumnHeader = screen.getByRole('columnheader', {  name: /sub-total/i});

      const orderTotalPriceHeading = screen.getByRole('heading', {  name: /total: r\$/i});
      const orderTotalPriceSpan = screen.getByText(/26,90/i)

      expect(pageTitle).toBeInTheDocument();

      expect(orderId).toBeInTheDocument();
      expect(sellerName).toBeInTheDocument();
      expect(orderDate).toBeInTheDocument();
      expect(orderStatus).toBeInTheDocument();

      expect(deliveredButton).toBeInTheDocument();

      expect(itemColumnHeader).toBeInTheDocument();
      expect(descriptionColumnHeader).toBeInTheDocument();
      expect(quantityColumnHeader).toBeInTheDocument();
      expect(unitPriceColumnHeader).toBeInTheDocument();
      expect(subTotalColumnHeader).toBeInTheDocument();

      expect(orderTotalPriceHeading).toBeInTheDocument();
      expect(orderTotalPriceSpan).toBeInTheDocument();
    });

    it('should have the expected cells in table', () => {
      const itemsNumber = screen.getAllByTestId(/customer_order_details__element-order-table-item-number/);

      expect(itemsNumber).toHaveLength(2);
      expect(itemsNumber[0].innerHTML).toBe('1');
      expect(itemsNumber[1].innerHTML).toBe('2');

      const names = screen.getAllByTestId(/customer_order_details__element-order-table-name/);

      expect(names).toHaveLength(2);
      expect(names[0].innerHTML).toBe('Skol Lata 250ml');
      expect(names[1].innerHTML).toBe('Heineken 600ml');

      const quantities = screen.getAllByTestId(/customer_order_details__element-order-table-quantity/);

      expect(quantities).toHaveLength(2);
      expect(quantities[0].innerHTML).toBe('2');
      expect(quantities[1].innerHTML).toBe('3');

      const unitPrices = screen.getAllByTestId(/customer_order_details__element-order-table-unit-price/);

      expect(unitPrices).toHaveLength(2);
      expect(unitPrices[0].innerHTML).toBe('R$ 2,20');
      expect(unitPrices[1].innerHTML).toBe('R$ 7,50');

      const subTotalPrices = screen.getAllByTestId(/customer_order_details__element-order-table-sub-total/);

      expect(subTotalPrices).toHaveLength(2);
      expect(subTotalPrices[0].innerHTML).toBe('R$ 4,40');
      expect(subTotalPrices[1].innerHTML).toBe('R$ 22,50');
    });
  });

  describe('when order is', () => {
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(localStorageCustomer));
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });
    
    describe('pending', () => {
      it('button should be disabled', async () => {
        service.getCustomerOrderById.mockImplementation(() => Promise.resolve(orders.customerOrderDetails));
        await act(async () => {
          renderWithRouter(<CustomerOrderDetail />);
        });

        const deliveredButton = screen.getByRole('button', {  name: /marcar como entregue/i});

        expect(deliveredButton).toBeDisabled();
      });
    });

    describe('being prepared', () => {
      it('button should be disabled', async () => {
        service.getCustomerOrderById.mockImplementation(() => Promise.resolve({ ...orders.customerOrderDetails, status: 'Preparando' }));
        await act(async () => {
          renderWithRouter(<CustomerOrderDetail />);
        });

        const deliveredButton = screen.getByRole('button', {  name: /marcar como entregue/i});

        expect(deliveredButton).toBeDisabled();
      });
    });

    describe('dispatched', () => {
      beforeEach(async () => {
        service.getCustomerOrderById.mockImplementation(() => Promise.resolve({ ...orders.customerOrderDetails, status: 'Em Trânsito' }));
        await act(async () => {
          renderWithRouter(<CustomerOrderDetail />);
        });
      });

      it('button should be enabled', async () => {
        const deliveredButton = screen.getByRole('button', {  name: /marcar como entregue/i});

        expect(deliveredButton).not.toBeDisabled();
      });

      it('clicking on button should call service.markAsDelivered', async () => {
        const deliveredButton = screen.getByRole('button', {  name: /marcar como entregue/i});

        await act(async () => {
          userEvent.click(deliveredButton);
        });

        expect(service.markAsDelivered).toHaveBeenCalledTimes(1);
      });

      it('clicking on button should change order status', async () => {
        const orderStatus = screen.queryByText(/em trânsito/i);
        const deliveredButton = screen.getByRole('button', {  name: /marcar como entregue/i});

        expect(orderStatus).toBeInTheDocument();
        expect(orderStatus.innerHTML).toBe('Em Trânsito');

        service.getCustomerOrderById.mockImplementationOnce(() => Promise.resolve({ ...orders.customerOrderDetails, status: 'Entregue' }));

        await act(async () => {
          userEvent.click(deliveredButton);
        });

        expect(orderStatus.innerHTML).toBe('Entregue');
      });

      it('clicking on button should disable it', async () => {
        const deliveredButton = screen.getByRole('button', {  name: /marcar como entregue/i});

        service.getCustomerOrderById.mockImplementationOnce(() => Promise.resolve({ ...orders.customerOrderDetails, status: 'Entregue' }));

        await act(async () => {
          userEvent.click(deliveredButton);
        });
        
        expect(deliveredButton).toBeDisabled();
      });
    });

    describe('already delivered', () => {
      beforeEach(async () => {
        service.getCustomerOrderById.mockImplementation(() => Promise.resolve({ ...orders.customerOrderDetails, status: 'Entregue' }));
        await act(async () => {
          renderWithRouter(<CustomerOrderDetail />);
        });
      });

      it('button should be disabled', () => {
        const deliveredButton = screen.getByRole('button', {  name: /marcar como entregue/i});

        expect(deliveredButton).toBeDisabled();
      });
    });
  });

  describe('order details', () => {
    it('should not show table if request returns undefined', async () => {
      service.getCustomerOrderById.mockImplementation(() => Promise.resolve());
      localStorage.setItem('user', JSON.stringify(localStorageCustomer));
      await act(async () => {
        renderWithRouter(<CustomerOrderDetail />);
      });

      const pageTitle = screen.getByRole('heading', {  name: /detalhe do pedido/i});

      const deliveredButton = screen.queryByRole('button', {  name: /marcar como entregue/i});

      const itemColumnHeader = screen.queryByRole('columnheader', {  name: /item/i});
      const descriptionColumnHeader = screen.queryByRole('columnheader', {  name: /descrição/i});
      const quantityColumnHeader = screen.queryByRole('columnheader', {  name: /quantidade/i});
      const unitPriceColumnHeader = screen.queryByRole('columnheader', {  name: /valor unitário/i});
      const subTotalColumnHeader = screen.queryByRole('columnheader', {  name: /sub-total/i});

      expect(pageTitle).toBeInTheDocument();

      expect(deliveredButton).not.toBeInTheDocument();

      expect(itemColumnHeader).not.toBeInTheDocument();
      expect(descriptionColumnHeader).not.toBeInTheDocument();
      expect(quantityColumnHeader).not.toBeInTheDocument();
      expect(unitPriceColumnHeader).not.toBeInTheDocument();
      expect(subTotalColumnHeader).not.toBeInTheDocument();

      localStorage.removeItem('user');
    });
  });
});
