import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { addRegister } from '../utils/api/service';

export default function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const registerUser = async (nameU, emailU, passwordU, roleU) => {
    const t = localStorage.getItem('token');
    const user = { nameU, emailU, passwordU, roleU };
    await addRegister(user, t);
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
          onClick={ () => registerUser(name, email, password, role) }
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}
