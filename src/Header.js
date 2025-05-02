import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import external CSS for header styling

function Header() {
  return (
    // Main header container
    <header className="header">

      {/* Website logo on the left side */}
      <img 
        src="/chancelogo.png" 
        alt="Second Chance Logo" 
        className="logo" 
      />

      {/* Navigation menu with internal routing */}
      <nav>
        <Link to="/">Home</Link>           {/* Link to homepage */}
        <Link to="/products">Products</Link>   {/* Link to products page */}
        <Link to="/orders">My Orders</Link>   {/* Link to user's orders */}
      </nav>

    </header>
  );
}

export default Header;
