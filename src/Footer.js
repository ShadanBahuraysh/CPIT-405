import React from 'react';
import './Footer.css'; // Importing the external CSS file for footer design

function Footer() {
  return (
    <div className="b">
      
      {/* Footer section containing navigation and social media columns */}
      <footer className="footer">
        
        {/* First column: Quick navigation links */}
        <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>         {/* Navigates to the homepage */}
          <a href="/products">Products</a> {/* Navigates to the products page */}
          <a href="/orders">My Orders</a>  {/* Navigates to the user's order history */}
        </div>

        {/* Second column: Product categories */}
        <div>
          <h3>Categories</h3>
          <a href="#">Clothing</a>     {/* Clothing category (link not yet active) */}
          <a href="#">Electronics</a>  {/* Electronics category */}
          <a href="#">Furniture</a>    {/* Furniture category */}
        </div>

        {/* Third column: Social media links */}
        <div>
          <h3>Follow Us</h3>
          <a href="#">Instagram</a>    {/* Link to the brand's Instagram page */}
          <a href="#">Twitter</a>      {/* Link to the brand's Twitter page */}
        </div>

      </footer>

      {/* Bottom copyright bar with legal notice */}
      <div className="copyright">
        © 2025 Second Chance. All rights reserved. {/* Legal footer text */}
      </div>

    </div>
  );
}

export default Footer;
