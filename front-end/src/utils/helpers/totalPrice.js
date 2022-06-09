function totalPrice(cart) {
  const price = cart.reduce((acc, cur) => acc + (cur.price * cur.qty), 0);

  return price;
}

export default totalPrice;
