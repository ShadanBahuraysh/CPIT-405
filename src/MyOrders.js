import './MyOrders.css';
import React, { useState } from 'react';


//======================== MY ORDERS COMPONENT =========================
export default function MyOrders() {
  //======================== STATE HOOKS =========================
  // Holds the user’s entered order code
  const [orderCode, setOrderCode] = useState('');

  // Holds order details fetched from the server
  const [orderInfo, setOrderInfo] = useState(null);

  // Tracks whether the order was not found
  const [notFound, setNotFound] = useState(false);


  //======================== HANDLE FORM SUBMISSION =========================
  // Sends a POST request with the order code to the backend and processes the response
  const handleSearch = (e) => {
    e.preventDefault();

    fetch('http://localhost/server/check_order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order_code: orderCode }) // Sends the order code as JSON
    })
      .then(res => res.json())
      .then(data => {
        if (data.found) {
          // If a matching order is found, update the order info and reset the "not found" flag
          setOrderInfo(data.order);
          setNotFound(false);
        } else {
          // If no order is found, clear any previous info and set the "not found" flag
          setOrderInfo(null);
          setNotFound(true);
        }
      })
      .catch(err => {
        console.error('Error fetching order:', err); // Log any network or parsing errors
      });
  };


  //======================== RENDER FORM AND RESULTS =========================
  return (
    <div className="homepage">
      <div className="my-orders">
        <h2>Track Your Order</h2>

        {/* Input form to enter and submit order code */}
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

        {/* If order info is available, display the order details */}
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

        {/* If no matching order is found, show an error message */}
        {notFound && (
          <p className="not-found">Order not found. Please check your code.</p>
        )}
      </div>
    </div>
  );
}