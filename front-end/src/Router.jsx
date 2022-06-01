import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrderDetail from './pages/CustomerOrderDetail';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetail from './pages/SellerOrderDetail';
import AdminManage from './pages/AdminManage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/customer/orders/:id" element={ <CustomerOrderDetail /> } />
      <Route path="/sellers/orders" element={ <SellerOrders /> } />
      <Route path="/sellers/orders/:id" element={ <SellerOrderDetail /> } />
      <Route path="/admin/manage" element={ <AdminManage /> } />
    </Routes>
  );
}
