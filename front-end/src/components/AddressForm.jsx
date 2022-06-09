import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';
import { createSale, getSellers } from '../utils/api/service';
import { localStorageUser } from '../utils/localStorage/localStorage';
import totalPrice from '../utils/helpers/totalPrice';

export default function AddressForm() {
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [selectValue, setSelectValue] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [sellers, setSellers] = useState([]);
  const { cart } = useContext(CustomerContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await getSellers();
      if (Array.isArray(apiResponse)) {
        setSellers(apiResponse);

        if (!selectValue && apiResponse.length > 0) {
          setSelectValue(apiResponse[0].id)
        }
      }
    }
    fetchData();

  }, []);

  useEffect(() => {
    const validateInputs = () => {
      setIsDisabled(address.length === 0 || addressNumber.length === 0 || !selectValue);
    };

    validateInputs();
  }, [address, addressNumber, selectValue]);

  const handleClick = async () => {
    const sale = {
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      sellerId: selectValue,
      products: cart.map(({ id, qty: quantity }) => ({ id, quantity })),
      totalPrice: totalPrice(cart),
    };
    const token = localStorageUser().token;
    const saleId = await createSale(sale, token);

    navigate(`/customer/orders/${saleId}`);
  };

  return (
    <section>
      <form>
        <label htmlFor="seller-input">
          P.Vendedora Responsável:
          <select
            data-testid="customer_checkout__select-seller"
            id="seller-input"
            onChange={ ({ target: { value } }) => setSelectValue(value) }
          >
            {sellers.map(({ name, id }) => (
              <option value={ id } key={ name }>{ name }</option>
            ))}
          </select>
        </label>
        <label htmlFor="address-input">
          Endereço:
          <input
            data-testid="customer_checkout__input-address"
            id="address-input"
            onChange={ ({ target: { value } }) => setAddress(value) }
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            type="text"
            value={ address }
          />
        </label>
        <label htmlFor="number-input">
          Número
          <input
            data-testid="customer_checkout__input-addressNumber"
            id="number-input"
            onChange={ ({ target: { value } }) => setAddressNumber(value) }
            placeholder="198"
            type="text"
          />
        </label>
      </form>
      <button
        data-testid="customer_checkout__button-submit-order"
        disabled={ isDisabled }
        onClick={ handleClick }
        type="button"
      >
        Finalizar Pedido
      </button>
    </section>
  );
}
