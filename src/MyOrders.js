import './MyOrders.css';
import React, { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
export default function MyOrders() {
  const [orderCode, setOrderCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    fetch('http://localhost/server/check_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderCode })
    })
    .then(res => res.json())
    .then(data => setMessage(data.status));
  };

  return (
    <div className="homepage">
      
      <Header />
      <div className="my-orders">
        <h2>Track Your Order</h2>
        <input
          type="text"
          placeholder="Enter your order code (e.g. SC-123456)"
          value={orderCode}
          onChange={e => setOrderCode(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <p>{message}</p>
      </div>
  
      <Footer />
      
    </div>
  );
  
  


   



}
