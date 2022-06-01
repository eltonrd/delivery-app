import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Login() {
  const { example, setExample } = useContext(AppContext);

  console.log(example);

  return (
    <div>
      <h1>Delivery App</h1>
      <form>
        <label htmlFor="login-input">
          Login:
          <input
            onChange={ ({ target }) => setExample(target.value) }
            type="text"
            name="login"
            id="login-input"
            data-testid="common_login__input-email"
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="text"
            name="password"
            id="password-input"
            data-testid="common_login__input-password"
          />
        </label>
        <input type="button" value="Login" data-testid="common_login__button-login" />
        <input
          type="button"
          value="Nao tenho conta"
          data-testid="common_login__button-register"
        />
      </form>

      <div data-testid="common_login__element-invalid-email">
        Email ou senha invalidos!
      </div>
    </div>
  );
}
