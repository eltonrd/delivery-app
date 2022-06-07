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

module.exports = {
  localStorageUser,
  setLocalStorageUser,
  localStorageCart,
  setLocalStorageCart,
  removeFromLocalStorage,
};
