import React from 'react';

export default function Register() {
  return (
    <div>
      <form>
        Cadastro:
        <label htmlFor="login-input">
          Nome:
          <input
            type="text"
            name="login"
            id="login-input"
            data-testid="common_register__input-name"
          />
        </label>
        <label htmlFor="password-input">
          Email:
          <input
            type="text"
            name="password"
            id="email-input"
            data-testid="common_register__input-email"
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            name="password"
            id="password-input"
            data-testid="common_register__input-password"
          />
        </label>
        <button type="button" data-testid="common_register__button-register">
          Cadastrar
        </button>
      </form>
      <div data-testid="common_register__element-invalid_register">
        Menssagem de error
      </div>
    </div>
  );
}
