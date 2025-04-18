import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/products" style={{ marginRight: 10 }}>Products</Link>
      <Link to="/request">Request</Link>
    </nav>
  );
}

export default Navbar;
