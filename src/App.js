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


//======================== MAIN APP COMPONENT STRUCTURE AND ROUTING =========================
function App() {
  return (
    // Wraps the entire app in routing context so navigation between pages works
    <Router>
      {/* Header is shown on all pages */}
      <Header />
      
      {/* Defines the routes for different pages of the app */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />

        {/* Route to display a list of all products */}
        <Route path="/products" element={<ProductList />} />

        {/* Dynamic route for showing individual product details by ID */}
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Route to show the user's orders */}
        <Route path="/orders" element={<MyOrders />} />
      </Routes>

      {/* Footer is also shown on all pages */}
      <Footer />
    </Router>
  );
}

export default App;