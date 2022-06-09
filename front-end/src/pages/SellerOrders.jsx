import React, { useState, useEffect } from 'react';
// import { localStorageUser } from '../utils/localStorage/localStorage';
import { getSellerOrders } from '../utils/api/service';
import NavBar from '../components/NavBar';
import SellerOrderCard from '../components/SellerOrderCard';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  // console.log(localStorageUser);

  useEffect(() => {
    const getOrders = async () => {
      const { token } = localStorage.getItem('user');
      const sellerOrders = await getSellerOrders(token);

      if (Array.isArray(sellerOrders) && orders.length > 0) {
        setOrders(sellerOrders);
      }
    };

    getOrders();
  }, []);

  return (
    <>
      <NavBar />
      <section>
        {
          orders.map((order, index) => (
            <SellerOrderCard key={ index } order={ order } />
          ))
        }
      </section>
    </>
  );
}
