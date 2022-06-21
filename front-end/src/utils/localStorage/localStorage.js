import { useState } from 'react';

export function localStorageUser() {
  const user = JSON.parse(localStorage.getItem('user'));

  return user;
}

export function setLocalStorageUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function localStorageCart() {
  const cart = JSON.parse(localStorage.getItem('carrinho'));

  return cart;
}

export function setLocalStorageCart(cart) {
  localStorage.setItem('carrinho', JSON.stringify(cart));
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

// useLocalStorage hook explanation: https://usehooks.com/useLocalStorage/

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
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
