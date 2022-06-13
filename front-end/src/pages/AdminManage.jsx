import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import AdminRegisterForm from '../components/AdminRegisterForm';
import UserList from '../components/UserList';

export default function AdminManage() {
  return (
    <main>
      <AdminNavBar />
      <AdminRegisterForm />
      <UserList />
    </main>
  );
}
