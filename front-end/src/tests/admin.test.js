jest.mock('../utils/api/service');

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AdminManage from '../pages/AdminManage';
import renderWithRouter from './renderWithRouter';
import LocalStorageMock from './mocks/localStorage';
import userMock from './mocks/user';
import * as service from '../utils/api/service';

global.localStorage = new LocalStorageMock;

describe('Test admin manage page', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({ token: userMock.administrator.token }),
    );
    service.adminRegister.mockImplementation(() => Promise.resolve(userMock.adminManage));
    renderWithRouter(<AdminManage />);
  });

  afterEach(() => jest.resetAllMocks());
  it('Should have the right screen elements', () => {
    const userLink = screen.getByRole('link', { name: /gerenciar usuários/i });
    const title = screen.getByTestId('customer_products__element-navbar-user-full-name');
    const logoutButton = screen.getByText(/sair/i);
    const newUserTitle = screen.getByRole('heading', { name: /cadastrar novo usuário/i, level: 1 });
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /senha/i });
    const roleInput = screen.getByRole('combobox', { name: /tipo/i });
    const createUserButton = screen.getByRole('button', { name: /cadastrar/i });
    const itemHeader = screen.getByRole('columnheader', { name: /item/i });
    const nameHeader = screen.getByRole('columnheader', { name: /nome/i });
    const emailHeader = screen.getByRole('columnheader', { name: /e\-mail/i });
    const typeHeader = screen.getByRole('columnheader', { name: /tipo/i });
    const deleteHeader = screen.getByRole('columnheader', { name: /excluir/i });

    expect(userLink).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(newUserTitle).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(roleInput).toBeInTheDocument();
    expect(createUserButton).toBeInTheDocument();
    expect(createUserButton).toBeDisabled();
    expect(itemHeader).toBeInTheDocument();
    expect(nameHeader).toBeInTheDocument();
    expect(emailHeader).toBeInTheDocument();
    expect(typeHeader).toBeInTheDocument();
    expect(deleteHeader).toBeInTheDocument();
  });

  it('Should enable button to create user', () => {
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /senha/i });
    const roleInput = screen.getByRole('combobox', { name: /tipo/i });
    const createUserButton = screen.getByRole('button', { name: /cadastrar/i });

    userEvent.type(nameInput, 'João dos testes');
    userEvent.type(emailInput, 'joao@test.com');
    userEvent.type(passwordInput, '12345678');
    userEvent.selectOptions(roleInput, 'Cliente');

    expect(createUserButton).not.toBeDisabled();
  });

  it('Should not enable button to create user', () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: /senha/i });
    const roleInput = screen.getByRole('combobox', { name: /tipo/i });
    const createUserButton = screen.getByRole('button', { name: /cadastrar/i });

    userEvent.type(emailInput, 'joao@test.com');
    userEvent.type(passwordInput, '12345678');
    userEvent.selectOptions(roleInput, 'Cliente');

    expect(createUserButton).toBeDisabled();
  });
});
