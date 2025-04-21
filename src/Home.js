import React, { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=3')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="homepage">
      <header className="header">
        <h1>Second Chance</h1>
        <nav>
          <a href="/products">Products</a>
          <a href="/request">Request</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Welcome to Second Chance</h2>
        <p>Give Items a New Life — Browse, Request, and Reuse</p>
        <a href="/products" className="button">Browse Products</a>
      </section>

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

      <section className="featured">
        <h3>Featured Products</h3>
        <div className="product-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.description.slice(0, 60)}...</p>
              <p className="price">${item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div>
          <h4>Second Chance</h4>
          <p>Giving pre-loved items a new home.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="/products">Products</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          
        </div>
      </footer>
      <div className="copyright">
        © 2025 Second Chance. All rights reserved.
      </div>
    </div>
  );
}