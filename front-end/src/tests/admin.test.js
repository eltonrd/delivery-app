jest.mock('../utils/api/service');

import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AdminManage from '../pages/AdminManage';
import renderWithRouter from './renderWithRouter';
import userMock from './mocks/user';
import * as service from '../utils/api/service';

const { user, token } = userMock.administrator;
const localStorageAdmin = { ...user, token };

const USER_NAME = 'valid_user_name';
const USER_EMAIL = 'user@user.com';
const USER_PASSWORD = 'user_password';

describe('Admin page', () => {
  afterEach(() => jest.resetAllMocks());

  describe('nav bar', () => {
    let history;

    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(localStorageAdmin));
      history = renderWithRouter(<AdminManage />).history;
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });
    
    it('should have the expected elements', () => {
      const manageLink = screen.getByRole('link', { name: /gerenciar usuários/i});
      const nameHeading = screen.getByRole('heading', { name: userMock.administrator.user.name });
      const logoutButton = screen.getByRole('button', { name: /sair/i});
      
      expect(manageLink).toBeInTheDocument();
      expect(nameHeading).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });

    describe('link to users management', () => {
      it('should redirect to /admin/manage', () => {
        history.push = jest.fn();
        const manageLink = screen.getByRole('link', { name: /gerenciar usuários/i});
        userEvent.click(manageLink);

        expect(history.push).toBeCalledWith({
            hash: '',
            pathname: '/admin/manage',
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

  describe('admin register form', () => {
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(localStorageAdmin));
      renderWithRouter(<AdminManage />);
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });

    it('should have the right screen elements', () => {
      const title = screen.getByRole('heading', {  name: /cadastrar novo usuário/i});
      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByRole('textbox', {  name: /senha:/i});
      const selectRole = screen.getByRole('combobox', {  name: /tipo:/i});
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });

      expect(title).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(selectRole).toBeInTheDocument();
      expect(selectRole.value).toBe('customer');
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toBeDisabled();
    });

    it('should enable the register button with valid inputs', () => {
      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByRole('textbox', {  name: /senha:/i});
      const selectRole = screen.getByRole('combobox', {  name: /tipo:/i});
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });
  
      expect(registerButton).toBeDisabled();
  
      userEvent.type(nameInput, USER_NAME);
      userEvent.type(emailInput, USER_EMAIL);
      userEvent.type(passwordInput, USER_PASSWORD);

      expect(registerButton).not.toBeDisabled();

      userEvent.selectOptions(selectRole, 'Vendedor')
      expect(registerButton).not.toBeDisabled();

      userEvent.selectOptions(selectRole, 'Administrador')
      expect(registerButton).not.toBeDisabled();
    });

    it('should not enable the register button with short name', () => {
      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByRole('textbox', {  name: /senha:/i});
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });
  
      expect(registerButton).toBeDisabled();
  
      userEvent.type(nameInput, 'tooshort');
      userEvent.type(emailInput, USER_EMAIL);
      userEvent.type(passwordInput, USER_PASSWORD);
  
      expect(registerButton).toBeDisabled();
    });
  
    it('should not enable the register button with invalid email format', () => {
      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByRole('textbox', {  name: /senha:/i});
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });

      expect(registerButton).toBeDisabled();
  
      userEvent.type(nameInput, USER_NAME);
      userEvent.type(emailInput, 'invalid_format.com');
      userEvent.type(passwordInput, USER_PASSWORD);
  
      expect(registerButton).toBeDisabled();
    });
  
    it('should not enable the register button with short password', () => {
      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByRole('textbox', {  name: /senha:/i});
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });

      expect(registerButton).toBeDisabled();
  
      userEvent.type(nameInput, USER_NAME);
      userEvent.type(emailInput, USER_EMAIL);
      userEvent.type(passwordInput, 'short');
  
      expect(registerButton).toBeDisabled();
    });
  });

  describe('users list', () => {
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(localStorageAdmin));
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });

    describe('if there is any', () => {
      beforeEach(async () => {
        service.getAllUsers.mockImplementation(() => Promise.resolve(userMock.adminManage));
        await act(async () => {
          renderWithRouter(<AdminManage />);
        });
      });

      it('should have the right column headers', () => {
        const itemHeader = screen.getByRole('columnheader', { name: /item/i });
        const nameHeader = screen.getByRole('columnheader', { name: /nome/i });
        const emailHeader = screen.getByRole('columnheader', { name: /e\-mail/i });
        const typeHeader = screen.getByRole('columnheader', { name: /tipo/i });
        const deleteHeader = screen.getByRole('columnheader', { name: /excluir/i });
  
        expect(itemHeader).toBeInTheDocument();
        expect(nameHeader).toBeInTheDocument();
        expect(emailHeader).toBeInTheDocument();
        expect(typeHeader).toBeInTheDocument();
        expect(deleteHeader).toBeInTheDocument();
      });

      it('should call service.getAllUsers', () => {
        expect(service.getAllUsers).toHaveBeenCalledTimes(1);
      });

      it('should call service.getAllUsers with user token', () => {
        expect(service.getAllUsers)
        .toHaveBeenCalledWith(localStorageAdmin.token);
      });

      it('should have the expected elements', () => {
        const itemsNumber = screen.getAllByTestId(/admin_manage__element-user-table-item-number/i);
        const usersName = screen.getAllByTestId(/admin_manage__element-user-table-name/i);
        const usersEmail = screen.getAllByTestId(/admin_manage__element-user-table-email/i);
        const usersRole = screen.getAllByTestId(/admin_manage__element-user-table-role/i);
        const deleteButtons = screen.getAllByRole('button', { name: /excluir/i });
  
        const usersElements = [
          ...itemsNumber,
          ...usersName,
          ...usersEmail,
          ...usersRole,
          ...deleteButtons,
        ];
  
        usersElements.forEach((element) => {
          expect(element).toBeInTheDocument();
        });
        
        expect(itemsNumber).toHaveLength(2);
        expect(usersName).toHaveLength(2);
        expect(usersEmail).toHaveLength(2);
        expect(usersRole).toHaveLength(2);
        expect(deleteButtons).toHaveLength(2);
      });
    });

    describe('if there is none', () => {
      beforeEach(async () => {
        service.getAllUsers.mockImplementation(() => Promise.resolve([]));
        await act(async () => {
          renderWithRouter(<AdminManage />);
        });
      });

      it('should have the right column headers', () => {
        const itemHeader = screen.getByRole('columnheader', { name: /item/i });
        const nameHeader = screen.getByRole('columnheader', { name: /nome/i });
        const emailHeader = screen.getByRole('columnheader', { name: /e\-mail/i });
        const typeHeader = screen.getByRole('columnheader', { name: /tipo/i });
        const deleteHeader = screen.getByRole('columnheader', { name: /excluir/i });
  
        expect(itemHeader).toBeInTheDocument();
        expect(nameHeader).toBeInTheDocument();
        expect(emailHeader).toBeInTheDocument();
        expect(typeHeader).toBeInTheDocument();
        expect(deleteHeader).toBeInTheDocument();
      });

      it('should call service.getAllUsers', () => {
        expect(service.getAllUsers).toHaveBeenCalledTimes(1);
      });

      it('should call service.getAllUsers with user token', () => {
        expect(service.getAllUsers)
        .toHaveBeenCalledWith(localStorageAdmin.token);
      });

      it('should not have the expected elements', () => {
        const itemsNumber = screen.queryAllByTestId(/admin_manage__element-user-table-item-number/i);
        const usersName = screen.queryAllByTestId(/admin_manage__element-user-table-name/i);
        const usersEmail = screen.queryAllByTestId(/admin_manage__element-user-table-email/i);
        const usersRole = screen.queryAllByTestId(/admin_manage__element-user-table-role/i);
        const deleteButtons = screen.queryAllByRole('button', { name: /excluir/i });
        
        expect(itemsNumber).toHaveLength(0);
        expect(usersName).toHaveLength(0);
        expect(usersEmail).toHaveLength(0);
        expect(usersRole).toHaveLength(0);
        expect(deleteButtons).toHaveLength(0);
      });
    });
  });

  describe('registering new valid user', () => {
    beforeEach(async () => {
      service.adminRegister.mockImplementation(() => Promise.resolve(false));
      service.getAllUsers.mockImplementation(() => Promise.resolve([]));
      localStorage.setItem('user', JSON.stringify(localStorageAdmin));
      await act(async () => {
        renderWithRouter(<AdminManage />);
      });
    });
    
    afterEach(() => {
      localStorage.removeItem('user');
    });

    it('should call service.adminRegister', async () => {
      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByRole('textbox', {  name: /senha:/i});
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });
  
      userEvent.type(nameInput, USER_NAME);
      userEvent.type(emailInput, USER_EMAIL);
      userEvent.type(passwordInput, USER_PASSWORD);

      service.getAllUsers.mockImplementation(() => Promise.resolve([{ id: 2, name: USER_NAME, email: USER_EMAIL, role: 'customer' }]));

      await act(async () => {
        userEvent.click(registerButton);
      });

      expect(service.adminRegister).toHaveBeenCalledTimes(1);
    });
  
    it('should call service.adminRegister with user name, email, password, role and admin token', async () => {
      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByRole('textbox', {  name: /senha:/i});
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });
  
      userEvent.type(nameInput, USER_NAME);
      userEvent.type(emailInput, USER_EMAIL);
      userEvent.type(passwordInput, USER_PASSWORD);

      service.getAllUsers.mockImplementationOnce(() => Promise.resolve([{ id: 2, name: USER_NAME, email: USER_EMAIL, role: 'customer' }]));

      await act(async () => {
        userEvent.click(registerButton);
      });

      expect(service.adminRegister)
      .toHaveBeenCalledWith({ name: USER_NAME, email: USER_EMAIL, password: USER_PASSWORD, role: 'customer' }, token);
    });

    it('should update user list', async () => {
      let usersName = screen.queryAllByTestId(/admin_manage__element-user-table-name/i);

      expect(usersName).toHaveLength(0);

      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByRole('textbox', {  name: /senha:/i});
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });
  
      userEvent.type(nameInput, USER_NAME);
      userEvent.type(emailInput, USER_EMAIL);
      userEvent.type(passwordInput, USER_PASSWORD);

      service.getAllUsers.mockImplementationOnce(() => Promise.resolve([{ id: 2, name: USER_NAME, email: USER_EMAIL, role: 'customer' }]));

      await act(async () => {
        userEvent.click(registerButton);
      });

      usersName = screen.queryAllByTestId(/admin_manage__element-user-table-name/i);

      expect(usersName).toHaveLength(1);
      expect(usersName[0].innerHTML).toBe(USER_NAME);
    });
  });
});
