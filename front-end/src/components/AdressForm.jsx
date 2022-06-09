import React, { useState, useEffect, useContext } from 'react';
import CustomerContext from '../context/CustomerContext';
import { getSellers } from '../utils/api/service';

export default function AdressForm() {
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [selectValue, setSelectValue] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [sellers, setSellers] = useState([]);
  const { cart } = useContext(CustomerContext);

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

  const handleClick = () => {
    // create sale request
    // navigate to order detail
    console.log('working!');
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
