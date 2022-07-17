import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import { customerOrders } from '../utils/api/service';
import { localStorageUser } from '../utils/localStorage/localStorage';
import CustomerNavBar from '../components/CustomerNavBar';
import { Container } from '../styles/orders';

export default function CustomerOrders() {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const userToken = localStorageUser().token;
      const orders = await customerOrders(userToken);
      if (Array.isArray(orders)) {
        setUserOrders(orders);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <CustomerNavBar />
      <Container>
        {
          userOrders.map((order, index) => <OrderCard key={ index } order={ order } />)
        }
      </Container>
    </>
  );
}
