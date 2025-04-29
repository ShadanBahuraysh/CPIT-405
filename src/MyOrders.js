import './MyOrders.css';
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function MyOrders() {
  const [orderCode, setOrderCode] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch('http://localhost/server/check_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order_code: orderCode })
    })
      .then(res => res.json())
      .then(data => {
        if (data.found) {
          setOrderInfo(data.order);
          setNotFound(false);
        } else {
          setOrderInfo(null);
          setNotFound(true);
        }
      })
      .catch(err => {
        console.error('Error fetching order:', err);
      });
  };

  return (
    <div className="homepage">
      <Header />
      
      <div className="my-orders">
        <h2>Track Your Order</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter your order code (e.g. SC-123456)"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>

        {orderInfo && (
          <div className="order-info">
            <h3>Order Details:</h3>
            <p><strong>Product ID:</strong> {orderInfo.product_id}</p>
            <p><strong>Name:</strong> {orderInfo.name}</p>
            <p><strong>Email:</strong> {orderInfo.email}</p>
            <p><strong>Address:</strong> {orderInfo.address}</p>
            <p><strong>Phone:</strong> {orderInfo.phone}</p>
            <p><strong>Order Code:</strong> {orderInfo.order_code}</p>
          </div>
        )}

        {notFound && (
          <p className="not-found">Order not found. Please check your code.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}