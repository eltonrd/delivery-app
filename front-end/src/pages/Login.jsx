import React, { useEffect, useState } from 'react';
// import AppContext from '../context/AppContext';

export default function Login() {
  // const { example, setExample } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const validateInputs = () => {
      const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+$/;
      const minPasswordLength = 6;

      setIsDisabled(password.length < minPasswordLength || !regex.test(email));
    };

    validateInputs();
  }, [password, email]);

  return (
    <div>
      <h1>Delivery App</h1>
      <form>
        <label htmlFor="login-input">
          Login:
          <input
            data-testid="common_login__input-email"
            id="login-input"
            name="login"
            onChange={ ({ target }) => setEmail(target.value) }
            type="text"
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="common_login__input-password"
            id="password-input"
            name="password"
            onChange={ ({ target }) => setPassword(target.value) }
            type="password"
          />
        </label>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ isDisabled }
        >
          Login
        </button>
        <button type="button" data-testid="common_login__button-register">
          Não tenho conta
        </button>
      </form>
      <div data-testid="common_login__element-invalid-email">
        Email ou senha invalidos!
      </div>
    </div>
  );
}
