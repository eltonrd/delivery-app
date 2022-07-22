jest.mock('axios');

import axios from 'axios';
import * as service from '../utils/api/service';

import user from './mocks/user';
import orders from './mocks/orders';

describe('service functions', () => {
  afterEach(() => { jest.resetAllMocks(); });

  describe('login', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.post.mockImplementation(() => {
          return Promise.resolve({ data: user.customer });
        });
  
        result = await service.login(user.customer.user.email, 'valid_password');
      });
  
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.post with proper parameters', () => {  
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/login', { email: user.customer.user.email, password: 'valid_password' });
      });

      it('should return correct user', () => {
        expect(result).toStrictEqual(user.customer);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.post.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });

        result = await service.login('', 'valid_password');
      });
  
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });

      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('register', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.post.mockImplementation(() => {
          return Promise.resolve({ data: user.customer });
        });
  
        result = await service.register(user.customer.user.name, user.customer.user.email, 'valid_password');
      });
  
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.post with proper parameters', () => {  
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/register', { name: user.customer.user.name, email: user.customer.user.email, password: 'valid_password' });
      });

      it('should return correct user', () => {
        expect(result).toStrictEqual(user.customer);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.post.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.register('', '', 'valid_password');
      });
      
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('getProducts', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.get.mockImplementation(() => {
          return Promise.resolve({ data: [] });
        });
  
        result = await service.getProducts();
      });
  
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.get with proper parameters', () => {  
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/customer/products');
      });

      it('should return an array', () => {
        expect(result).toStrictEqual([]);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.get.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.getProducts();
      });
      
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('adminRegister', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.post.mockImplementation(() => {
          return Promise.resolve({});
        });
  
        result = await service.adminRegister({ ...user.customer, token: undefined }, user.administrator.token);
      });
  
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.post with proper parameters', () => {  
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/admin/manage', { ...user.customer, token: undefined }, { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.post.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.adminRegister({ ...user.customer, token: undefined }, 'invalid_token');
      });
      
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });

  describe('getAllUsers', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.get.mockImplementation(() => {
          return Promise.resolve({ data: [] });
        });
  
        result = await service.getAllUsers(user.administrator.token);
      });
  
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.get with proper parameters', () => {  
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/admin/manage', { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });

      it('should return an array', () => {
        expect(result).toStrictEqual([]);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.get.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.getAllUsers('invalid_token');
      });
      
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('deleteById', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.delete.mockImplementation(() => {
          return Promise.resolve({});
        });
  
        result = await service.deleteById(2, user.administrator.token);
      });
  
      it('should call axios.delete', () => {  
        expect(axios.delete).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.delete with proper parameters', () => {  
        expect(axios.delete).toHaveBeenCalledWith('http://localhost:3001/admin/manage/2', { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.delete.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.deleteById('invalid_token');
      });
      
      it('should call axios.delete', () => {  
        expect(axios.delete).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('customerOrders', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.get.mockImplementation(() => {
          return Promise.resolve({ data: orders.customerOrders });
        });
  
        result = await service.customerOrders(user.customer.token);
      });
  
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.get with proper parameters', () => {  
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/customer/orders', { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });

      it('should return orders array', () => {
        expect(result).toStrictEqual(orders.customerOrders);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.get.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.customerOrders('invalid_token');
      });
      
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('getCustomerOrderById', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.get.mockImplementation(() => {
          return Promise.resolve({ data: orders.customerOrderDetails });
        });
  
        result = await service.getCustomerOrderById(user.customer.token, 4);
      });
  
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.get with proper parameters', () => {  
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/customer/orders/4', { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });

      it('should return order', () => {
        expect(result).toStrictEqual(orders.customerOrderDetails);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.get.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.getCustomerOrderById(1000, 'invalid_token');
      });
      
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('getSellers', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.get.mockImplementation(() => {
          return Promise.resolve({ data: user.sellers });
        });
  
        result = await service.getSellers();
      });
  
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.get with proper parameters', () => {  
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/seller');
      });

      it('should return array of sellers', () => {
        expect(result).toStrictEqual(user.sellers);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.get.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.getSellers();
      });
      
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('createSale', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.post.mockImplementation(() => {
          return Promise.resolve({ data: { id: 5 } });
        });
  
        result = await service.createSale(orders.orderToBeCreated, user.customer.token);
      });
  
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.post with proper parameters', () => {  
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/sales', orders.orderToBeCreated, { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });

      it('should return info about created sale', () => {
        expect(result).toBe(5);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.post.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.createSale();
      });
      
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('markAsDelivered', () => {
    describe('successful request', () => {
      beforeEach(async () => {
        axios.patch.mockImplementation(() => {
          return Promise.resolve();
        });

        await service.markAsDelivered(user.customer.token, 2);
      });
  
      it('should call axios.patch', () => {  
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.patch with proper parameters', () => {  
        expect(axios.patch).toHaveBeenCalledWith('http://localhost:3001/seller/orders/delivered/2', {}, { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.patch.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        await service.markAsDelivered('invalid_token', 1000);
      });
      
      it('should call axios.patch', () => {  
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('markAsDispatched', () => {
    describe('successful request', () => {
      beforeEach(async () => {
        axios.patch.mockImplementation(() => {
          return Promise.resolve();
        });

        await service.markAsDispatched(user.seller.token, 2);
      });
  
      it('should call axios.patch', () => {  
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.patch with proper parameters', () => {  
        expect(axios.patch).toHaveBeenCalledWith('http://localhost:3001/seller/orders/leave/2', {}, { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.patch.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        await service.markAsDispatched('invalid_token', 1000);
      });
      
      it('should call axios.patch', () => {  
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('markAsPreparing', () => {
    describe('successful request', () => {
      beforeEach(async () => {
        axios.patch.mockImplementation(() => {
          return Promise.resolve();
        });

        await service.markAsPreparing(user.seller.token, 2);
      });
  
      it('should call axios.patch', () => {  
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.patch with proper parameters', () => {  
        expect(axios.patch).toHaveBeenCalledWith('http://localhost:3001/seller/orders/start/2', {}, { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });
    });

    describe('unsuccessful request', () => {
      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.patch.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        await service.markAsPreparing('invalid_token', 1000);
      });
      
      it('should call axios.patch', () => {  
        expect(axios.patch).toHaveBeenCalledTimes(1);
      });

      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getSellerOrders', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.get.mockImplementation(() => {
          return Promise.resolve({ data: orders.sellerOrders });
        });
  
        result = await service.getSellerOrders(user.seller.token);
      });
  
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.get with proper parameters', () => {  
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/seller/orders', { headers: { authorization: 'valid_token' } });
      });

      it('should return orders array', () => {
        expect(result).toStrictEqual(orders.sellerOrders);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.get.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.getSellerOrders('invalid_token');
      });
      
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('getSellerOrderById', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.get.mockImplementation(() => {
          return Promise.resolve({ data: orders.sellerOrderDetails });
        });
  
        result = await service.getSellerOrderById(user.seller.token, 4);
      });
  
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.get with proper parameters', () => {  
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/seller/orders/4', { headers: { 'Content-Type': 'application/json', authorization: 'valid_token' } });
      });

      it('should return order', () => {
        expect(result).toStrictEqual(orders.sellerOrderDetails);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.get.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.getSellerOrderById(1000, 'invalid_token');
      });
      
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });
});
