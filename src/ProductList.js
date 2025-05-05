// ProductList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

/**==================ProductCard: Renders a single product card and handles click to navigate to details================*/
function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description.slice(0, 100)}...</p>
      <p className="product-price">${product.price}</p>
    </div>
  );
}

/**=============== CoolFactButton: Displays a button that shows a sustainability fact============*/
function CoolFactButton({ onClick }) {
  return (
    <button className="view-all-button" onClick={onClick}>
      Want to Know Something Cool?
    </button>
  );
}

/**
 * ProductList: Fetches a list of products from API, shuffles,
 * slices to 6, and renders ProductCard and CoolFactButton.
 */
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Shuffle the products array in-place
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fetch products once on mount
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const shuffled = shuffleArray(data);
        setProducts(shuffled.slice(0, 6));
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const showCoolFact = () => {
    alert('🌍 Buying second-hand clothes can save up to 79% of CO2 emissions compared to buying new ones!');
  };

  return (
    <div className="homepage">
      <h1 className="products-title">Happy Shopping!</h1>
      <p className="products-description">
        Discover sustainable deals and give items a second life!
      </p>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/products/${product.id}`, { state: { product } })}
          />
        ))}
      </div>

      <div className="view-all-container">
        <CoolFactButton onClick={showCoolFact} />
      </div>
    </div>
  );
}
