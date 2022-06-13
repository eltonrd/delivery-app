import React, { useEffect, useState } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import AdminRegisterForm from '../components/AdminRegisterForm';
import UserList from '../components/UserList';
import { getAllUsers } from '../utils/api/service';
import { localStorageUser } from '../utils/localStorage/localStorage';

export default function AdminManage() {
  const [users, setUsers] = useState([]);
  const { token } = localStorageUser();

  const getUsers = async () => {
    const apiUsers = await getAllUsers(token);
    if (Array.isArray(apiUsers)) {
      setUsers(apiUsers);
    }
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <main>
      <AdminNavBar />
      <AdminRegisterForm update={ getUsers } />
      <UserList update={ getUsers } users={ users } />
    </main>
  );
}
