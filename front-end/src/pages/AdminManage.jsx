import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
// import UserList from '../components/UserList';
import { adminRegister } from '../utils/api/service';

export default function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRegisterWrong, setIsRegisterWrong] = useState(false);

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
    const t = localStorage.getItem('token');
    const user = { name, email, password, role };
    const response = await adminRegister(user, t);
    setIsRegisterWrong(response);
  };

  return (
    <div>
      <NavBar />
      <h1>Cadastrar novo usuário</h1>
      <form>
        <label htmlFor="name-input">
          Nome:
          <input
            data-testid="admin_manage__input-name"
            id="name-input"
            name="name"
            onChange={ ({ target }) => setName(target.value) }
            type="text"
          />
        </label>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="admin_manage__input-email"
            id="email-input"
            name="email"
            onChange={ ({ target }) => setEmail(target.value) }
            type="text"
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="admin_manage__input-password"
            id="password-input"
            name="password"
            onChange={ ({ target }) => setPassword(target.value) }
            type="text"
          />
        </label>
        <label htmlFor="role-input">
          Tipo:
          <select
            id="role-input"
            onChange={ ({ target }) => setRole(target.value) }
            data-testid="admin_manage__select-role"
          >
            <option value="customer">Cliente</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ isDisabled }
          onClick={ registerUser }
        >
          CADASTRAR
        </button>
      </form>
      {
        isRegisterWrong
        && (
          <div data-testid="admin_manage__element-invalid-register">
            Usuário já cadastrado!
          </div>
        )
      }
      {/* <UserList /> */}
    </div>
  );
}
