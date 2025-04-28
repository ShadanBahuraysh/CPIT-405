import React from 'react';
import './Footer.css'; // نفس التنسيق الموجود

function Footer() {
  return (
    <div className="b">

      {/* Footer */}

      <footer className="footer">
        <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/orders">My Orders</a>
        </div>
        <div>
          <h3>Categories</h3>
          <a href="#">Clothing</a>
          <a href="#">Electronics</a>
          <a href="#">Furniture</a>
        </div>
        <div>
          <h3>Follow Us</h3>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </footer>

      {/* Copyright */}
      <div className="copyright">
        © 2025 Second Chance. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;