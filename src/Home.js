import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';


//======================== HOME PAGE COMPONENT =========================
export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook used for programmatic navigation


  //======================== FUNCTION TO SELECT RANDOM PRODUCTS =========================
  // Takes an array of products and returns 3 randomly selected items
  const getRandomProducts = (data) => {
    const shuffled = data.sort(() => 0.5 - Math.random()); // Randomly shuffle array
    return shuffled.slice(0, 3); // Return only the first 3 items
  };


  //======================== FETCH DATA FROM API ON PAGE LOAD =========================
  // Fetches product data once when the component is mounted, then sets 3 random products
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(getRandomProducts(data)))  // Set the featured products
      .catch(err => console.error("Error fetching products:", err));
  }, []);


  //======================== RENDERING THE PAGE LAYOUT =========================
  return (
    <div className="homepage">

      {/* Hero section with welcome message and call-to-action */}
      <section className="hero">
        <h2>Welcome to Second Chance</h2>
        <p>Give Items a New Life — Browse, Request, and Reuse</p>
        <a href="/products" className="button">Browse Products</a>
      </section>

       {/*======================== STEP-BY-STEP USER FLOW VISUAL =========================*/}
      {/* Icons and labels to explain the user process: Browse → Request → Reuse */}
      <section className="steps">
        <div>
          <span role="img" aria-label="browse">🔍</span>
          <p>Browse</p>
        </div>
        <div><span>➡️</span></div>
        <div>
          <span role="img" aria-label="order">🛒</span>
          <p>Request</p>
        </div>
        <div><span>➡️</span></div>
        <div>
          <span role="img" aria-label="reuse">♻️</span>
          <p>Reuse</p>
        </div>
      </section>

      {/*======================== FEATURED PRODUCTS SECTION =========================*/}
      {/* Displaying 3 randomly selected products from the API */}
      <section className="featured">
        <h3>Featured Products</h3>
        <div className="product-grid">
          {products.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/products/${item.id}`)} // Navigate to product details on click
            >
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.description.slice(0, 60)}...</p> {/* Short preview of the description */}
              <p className="price">${item.price}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}