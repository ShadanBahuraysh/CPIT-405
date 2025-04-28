import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import MyOrders from './MyOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<MyOrders />} />
       
      </Routes>
    </Router>
  );
}

export default App;