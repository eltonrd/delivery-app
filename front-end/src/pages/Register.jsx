import React from 'react'

export default function register() {
  return (
    <div>
    <form>
      Cadastro
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
            id="password-input"
            data-testid="common_register__input-email"
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="text"
            name="password"
            id="password-input"
            data-testid="common_register__input-password"
          />
        </label>
        <input
          type="button"
          value="Cadastrar"
          data-testid="common_register__button-register"
        />
      </form>
      <div>
        Menssagem de error
      </div>
  </div>
  )
}

