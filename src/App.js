import React from 'react';
// BrowserRouter provides routing context; Routes defines route list; Route maps paths to components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Page components for different routes
import Home from './Home';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import MyOrders from './MyOrders';

// Layout components displayed on every page
import Header from './Header';
import Footer from './Footer';


function App() {
  return (
    <Router>
        <Header />
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />
        {/* Route to list all products */}
        <Route path="/products" element={<ProductList />} />
         {/* Dynamic route for product details using URL parameter `id` */} 
        <Route path="/products/:id" element={<ProductDetails />} />
         {/* Route to display the user's orders */} 
        <Route path="/orders" element={<MyOrders />} />
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
