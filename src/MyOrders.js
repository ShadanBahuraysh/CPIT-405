import './MyOrders.css';
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function MyOrders() {
  // State to hold the user's entered order code
  const [orderCode, setOrderCode] = useState('');

   // State to store order details returned from the server
  const [orderInfo, setOrderInfo] = useState(null);

   // State to track if no matching order was found
  const [notFound, setNotFound] = useState(false);

   // Handle form submission to search for an order
  const handleSearch = (e) => {
    e.preventDefault();

    // Send POST request with JSON payload to check_order endpoint
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
           // If order is found, store the details and clear any "not found" message
          setOrderInfo(data.order);
          setNotFound(false);
        } else {
          // If no order, clear existing details and show "not found" message
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

     {/* Form to submit the order code */}
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
        {/* Display order details if found */}
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
        {/* Display a message if no order was found */}
        {notFound && (
          <p className="not-found">Order not found. Please check your code.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
