const { useState } = require('react');

function localStorageUser() {
  const user = JSON.parse(localStorage.getItem('user'));

  return user;
}

function setLocalStorageUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function localStorageCart() {
  const cart = JSON.parse(localStorage.getItem('carrinho'));

  return cart;
}

function setLocalStorageCart(cart) {
  localStorage.setItem('carrinho', JSON.stringify(cart));
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

// useLocalStorage hook explanation: https://usehooks.com/useLocalStorage/

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function
        ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

module.exports = {
  localStorageUser,
  setLocalStorageUser,
  localStorageCart,
  setLocalStorageCart,
  removeFromLocalStorage,
  useLocalStorage,
};
