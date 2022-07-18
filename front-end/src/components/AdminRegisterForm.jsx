import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { adminRegister } from '../utils/api/service';
import { localStorageUser } from '../utils/localStorage/localStorage';
import * as S from '../styles/adminManage';

export default function AdminRegisterForm({ update }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const validateInputs = () => {
      const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+\.?[a-z]+$/;
      const minPasswordLength = 6;
      const minNameLength = 12;

      setIsDisabled(
        password.length < minPasswordLength
        || !regex.test(email)
        || name.length < minNameLength,
      );
    };

    validateInputs();
  }, [password, email, name]);

  const registerUser = async () => {
    const t = localStorageUser().token;
    const user = { name, email, password, role };
    const response = await adminRegister(user, t);
    if (response) {
      return toast
        .error('Usuário já cadastrado', { theme: 'dark', position: 'top-center' });
    }

    setName('');
    setEmail('');
    setPassword('');
    setRole('customer');
    update();
  };

  return (
    <S.Container>
      <S.Title>Cadastrar novo usuário</S.Title>
      <S.Form>
        <S.Label htmlFor="name-input">
          Nome
          <S.Input
            data-testid="admin_manage__input-name"
            id="name-input"
            name="name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
            type="text"
          />
        </S.Label>
        <S.Label htmlFor="email-input">
          Email
          <S.Input
            data-testid="admin_manage__input-email"
            id="email-input"
            name="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            type="text"
          />
        </S.Label>
        <S.Label htmlFor="password-input">
          Senha
          <S.Input
            data-testid="admin_manage__input-password"
            id="password-input"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            type="text"
          />
        </S.Label>
        <S.Label htmlFor="role-input">
          Tipo
          <S.Select
            id="role-input"
            value={ role }
            onChange={ ({ target }) => setRole(target.value) }
            data-testid="admin_manage__select-role"
          >
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </S.Select>
        </S.Label>
        <S.Button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ isDisabled }
          onClick={ registerUser }
        >
          CADASTRAR
        </S.Button>
      </S.Form>
    </S.Container>
  );
}

AdminRegisterForm.propTypes = {
  update: PropTypes.func.isRequired,
};
