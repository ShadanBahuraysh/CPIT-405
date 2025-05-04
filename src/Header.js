import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import external CSS for header styling


//======================== HEADER COMPONENT WITH LOGO AND NAVIGATION =========================
function Header() {
  return (
    //======================== HEADER CONTAINER =========================
    <header className="header">

      {/*//======================== WEBSITE LOGO SECTION =========================*/}
      {/* Displays the website's logo image */}
      <img src={`${process.env.PUBLIC_URL}/chancelogo.png`} alt="Second Chance Logo" className="logo" />

      {/*======================== NAVIGATION MENU =========================*/}
      {/* Navigation bar with internal links using React Router */}
      <nav>
        <Link to="/">Home</Link>           {/* Navigates to homepage */}
        <Link to="/products">Products</Link>   {/* Navigates to products listing */}
        <Link to="/orders">My Orders</Link>   {/* Navigates to user's order history */}
      </nav>

    </header>
  );
}

export default Header;