import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import Header from './Header';
import Footer from './Footer';
function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const shuffled = shuffleArray(data);
        setProducts(shuffled.slice(0, 6));
      });
  }, []);

  const showCoolFact = () => {
    alert('🌍 Buying second-hand clothes can save up to 79% of CO2 emissions compared to buying new ones!');
  };
  return (
    <div className="homepage">
      
      <Header />

      {/* Title */}
      <h1 className="products-title">Happy Shopping!</h1>

      {/* Small description */}
      <p className="products-description">
        Discover sustainable deals and give items a second life!
      </p>

      {/* Product Cards */}
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description.slice(0, 100)}...</p>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Cool Fact Button */}
      <div className="view-all-container">
        <button className="view-all-button" onClick={showCoolFact}>
          Want to Know Something Cool?
        </button>
      </div>

      <Footer />

    </div>
  );
}

export default ProductList;