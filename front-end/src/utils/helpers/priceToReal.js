const priceToReal = (price, currency = false) => {
  let number = price;
  if (typeof price !== 'number') {
    number = parseFloat(number);
  }

  const realNotation = number.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
  });

  if (currency) {
    return `R$ ${realNotation}`;
  }

  return realNotation;
};

export default priceToReal;
