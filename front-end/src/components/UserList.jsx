import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/api/service';

export default function UserList() {
  const [users, setUsers] = useState();
  const tokenAdmin = localStorage.getItem('token');

  useEffect(() => {
    const getUsers = async () => {
      const apiUsers = await getAllUsers(token);
      setUsers(apiUsers);
    };
    getUsers();
  }, [tokenAdmin]);

  return (
    users !== undefined ? (
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
