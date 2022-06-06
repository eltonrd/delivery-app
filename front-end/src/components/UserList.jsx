import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/api/service';

export default function UserList() {
  const [load, setLoad] = useState(false);
  const tokenAdmin = localStorage.getItem('token');
  const getUsers = async (token) => {
    const users = await getAllUsers(token);
    setLoad(true);
    return users;
  };

  useEffect(() => {
    getUsers(tokenAdmin);
  }, [tokenAdmin]);

  // const mockUsers = [
  //   {
  //     id: 1,
  //     name: 'Delivery App Admin',
  //     email: 'adm@deliveryapp.com',
  //     passaword: 'a4c86edecc5aee06eff8fdeda69e0d04',
  //     role: 'administrator',
  //   }, {
  //     id: 2,
  //     name: 'Fulana Pereira',
  //     email: 'afulana@deliveryapp.com',
  //     passaword: '3c28d2b0881bf46457a853e0b07531c6',
  //     role: 'seller',
  //   },
  // ];
  return (
    load === 'true' ? (
      <table>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
        {
          usuarios.map((user, index) => (
            <tr key={ user.id }>
              <td data-testid={ `admin_manage__element-user-table-item-number-${index}` }>
                { index + 1 }
              </td>
              <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
                { user.name }
              </td>
              <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                { user.email }
              </td>
              <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
                { user.role }
              </td>
              <td data-testid={ `admin_manage__element-user-table-remove-${index}` }>
                <button type="button">EXCLUIR</button>
              </td>
            </tr>
          ))
        }
      </table>
    ) : (
      <div>
        Carregando ....
      </div>
    )

  );
}
