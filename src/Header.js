import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // نستخدم نفس CSS حقك

function Header() {
  return (
    <header className="header">
      <img src="/chancelogo.png" alt="Second Chance Logo" className="logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">My Orders</Link>
      </nav>
    </header>
  );
}

export default Header;