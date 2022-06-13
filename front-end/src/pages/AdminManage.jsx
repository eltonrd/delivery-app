import React, { useState, useEffect } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import AdminRegisterForm from '../components/AdminRegisterForm';
// import UserList from '../components/UserList';

export default function AdminManage() {
  return (
    <div>
      <AdminNavBar />
      <AdminRegisterForm />
      {/* <UserList /> */}
    </div>
  );
}
