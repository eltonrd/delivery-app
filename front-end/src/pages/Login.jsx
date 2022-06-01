import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../utils/api/service';
import RockGlass from '../images/rockGlass.svg';
import AppContext from '../context/AppContext';

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoginWrong, setIsLoginWrong] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const validateInputs = () => {
      const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+$/;
      const minPasswordLength = 6;

      setIsDisabled(password.length < minPasswordLength || !regex.test(email));
    };

    validateInputs();
  }, [password, email]);

  const handleRole = (role) => {
    switch (role) {
    case 'administrator':
      navigate('/admin/manage');
      break;
    case 'customer':
      navigate('/customer/products');
      break;
    default:
      navigate('/seller/orders');
    }
  };

  const sendLoginInfo = async () => {
    const user = await login(email, password);

    if (!user) {
      setIsLoginWrong(true);
    } else {
      setUser(user.user);
      localStorage.setItem('token', user.token);
      handleRole(user.role);
    }
  };

  return (
    <div>
      <img alt="logo app delivery" src={ RockGlass } width="100px" />
      <h1>Delivery App</h1>
      <form>
        <label htmlFor="login-input">
          Login
          <input
            data-testid="common_login__input-email"
            id="login-input"
            name="login"
            onChange={ ({ target }) => setEmail(target.value) }
            type="text"
          />
        </label>
        <label htmlFor="password-input">
          Senha
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
          onClick={ sendLoginInfo }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Não tenho conta
        </button>
      </form>
      {
        isLoginWrong
        && (
          <div data-testid="common_login__element-invalid-email">
            Email ou senha invalidos!
          </div>
        )
      }
    </div>
  );
}
