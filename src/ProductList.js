//======================== IMPORTS =========================
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';


//======================== PRODUCT LIST COMPONENT =========================
function ProductList() {

  //======================== STATE AND NAVIGATION HOOKS =========================
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  //======================== SHUFFLE UTILITY FUNCTION =========================
  // Randomly shuffles the array of products using Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  //======================== FETCH PRODUCTS FROM API ONCE ON MOUNT =========================
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const shuffled = shuffleArray(data);
        setProducts(shuffled.slice(0, 6));
      });
  }, []);


  //======================== FUN FACT BUTTON HANDLER =========================
  // Shows a sustainability-related message in an alert popup
  const showCoolFact = () => {
    alert('🌍 Buying second-hand clothes can save up to 79% of CO2 emissions compared to buying new ones!');
  };


  //======================== RENDER PRODUCT LIST PAGE =========================
  return (
    <div className="homepage">

      <h1 className="products-title">Happy Shopping!</h1>

      <p className="products-description">
        Discover sustainable deals and give items a second life!
      </p>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate("/products/" + product.id, { state: { product } })}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description.slice(0, 100)}...</p>
            <p className="product-price">${product.price}</p>
          </div>
        ))}
      </div>

      <div className="view-all-container">
        <button className="view-all-button" onClick={showCoolFact}>
          Want to Know Something Cool?
        </button>
      </div>

    </div>
  );
}

export default ProductList;