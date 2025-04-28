import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ اضفنا useNavigate
import Header from './Header';
import Footer from './Footer';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // ✅ داخل الكومبوننت

  // دالة لاختيار 3 منتجات عشوائية
  const getRandomProducts = (data) => {
    // نستخدم دالة shuffle لترتيب المنتجات عشوائيًا
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3); // نأخذ 3 منتجات فقط
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(getRandomProducts(data)))  // تعيين المنتجات العشوائية
      .catch(err => console.error("Error fetching products:", err));
  }, []);



  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <Header />

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
            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/products/${item.id}`)} // ✅ هنا التنقل
            >
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.description.slice(0, 60)}...</p>
              <p className="price">${item.price}</p>
            </div>
          ))}
        </div>
       
      </section>

      <Footer />
    </div>
  );
}
