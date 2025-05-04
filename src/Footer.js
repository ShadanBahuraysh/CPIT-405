import React from 'react';
import './Footer.css'; // Importing the external CSS file for footer design


//======================== FOOTER COMPONENT STRUCTURE AND CONTENT =========================
function Footer() {
  return (
          //======================== MAIN FOOTER CONTAINER =========================

    <div className="b">
      {/*======================== MAIN FOOTER CONTAINER =========================*/}
      {/* Footer section containing navigation and social media columns */}
      <footer className="footer">
        
        {/*======================== QUICK LINKS COLUMN =========================*/}
        {/* First column: Quick navigation links */}
        <div>
          <h3>Quick Links</h3>
          <a href="/">Home</a>         {/* Navigates to the homepage */}
          <a href="/products">Products</a> {/* Navigates to the products page */}
          <a href="/orders">My Orders</a>  {/* Navigates to the user's order history */}
        </div>

        {/*======================== CATEGORIES COLUMN =========================*/}
        {/* Second column: Product categories (placeholders) */}
        <div>
          <h3>Categories</h3>
          <button onClick={() => alert('Clothing page coming soon!')}>Clothing</button>
          <button onClick={() => alert('Electronics page coming soon!')}>Electronics</button>
          <button onClick={() => alert('Furniture page coming soon!')}>Furniture</button>
        </div>

        {/*//======================== SOCIAL MEDIA LINKS COLUMN =========================*/}
        {/* Third column: Social media links (placeholders) */}
        <div>
          <h3>Follow Us</h3>
          <button onClick={() => alert('Instagram link coming soon!')}>Instagram</button>
          <button onClick={() => alert('Twitter link coming soon!')}>Twitter</button>
        </div>

      </footer>

      {/*======================== COPYRIGHT FOOTER =========================*/}
      {/* Bottom copyright bar */}
      <div className="copyright">
        ©️ 2025 Second Chance. All rights reserved.
      </div>

    </div>
  );
}

export default Footer;