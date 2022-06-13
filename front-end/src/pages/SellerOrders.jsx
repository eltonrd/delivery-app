import React, { useState, useEffect } from 'react';
import { localStorageUser } from '../utils/localStorage/localStorage';
import { getSellerOrders } from '../utils/api/service';
import SellerNavBar from '../components/SellerNavBar';
import SellerOrderCard from '../components/SellerOrderCard';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const { token } = localStorageUser();
      const sellerOrders = await getSellerOrders(token);

      if (Array.isArray(sellerOrders) && sellerOrders.length > 0) {
        setOrders(sellerOrders);
      }
    };

    getOrders();
  }, []);

  return (
    <>
      <SellerNavBar />
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
