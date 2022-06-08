import React, { useState, useEffect } from 'react';
import { getSellers } from '../utils/api/service';

export default function AdressForm() {
  const [address, setAdress] = useState('');
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await getSellers();
      if (Array.isArray(apiResponse)) {
        setSellers(apiResponse);
      }
    }
    fetchData();
  }, []);

  return (
    <section>
      <form>
        <label htmlFor="seller-input">
          P.Vendedora Responsável:
          <select id="seller-input">
            {sellers.map(({ name }) => (
              <option value={ name } key={ name }>{ name }</option>
            ))}
          </select>
        </label>
        <label htmlFor="address-input">
          Endereço:
          <input
            id="address-input"
            onChange={ ({ target: { value } }) => setAdress(value) }
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            type="text"
            value={ address }
          />
        </label>
        <label htmlFor="number-input">
          Número
          <input
            id="number-input"
            placeholder="198"
            type="text"
          />
        </label>
      </form>
      <button type="button">Finalizar Pedido</button>
    </section>
  );
}
