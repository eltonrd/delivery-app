import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import { customerOrders } from '../utils/api/service';
import { localStorageUser } from '../utils/localStorage/localStorage';
import CustomerNavBar from '../components/CustomerNavBar';

export default function CustomerOrders() {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const userToken = localStorageUser().token;
      const orders = await customerOrders(userToken);
      setUserOrders(orders);
    };
    getOrders();
  }, []);

  return (
    <>
      <CustomerNavBar />
      <div>
        {
          userOrders.map((order, index) => <OrderCard key={ index } order={ order } />)
        }
      </div>
    </>
  );
}
