import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import NavBar from '../components/NavBar';
import { customerOrders } from '../utils/api/service';
import { localStorageUser } from '../utils/localStorage/localStorage';

export default function CustomerOrders() {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const userToken = localStorageUser().token;
      const orders = await customerOrders(userToken);
      console.log(orders);
      console.log(userToken);
      setUserOrders(orders);
    };
    getOrders();
  }, []);

  return (
    <>
      <NavBar />
      <div>
        {
          userOrders.map((order, index) => <OrderCard key={ index } order={ order } />)
        }
      </div>
    </>
  );
}
