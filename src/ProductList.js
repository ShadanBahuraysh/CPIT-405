// Import necessary hooks and components
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';    // Used for navigation between pages
import './ProductList.css';                        // Import the CSS styling for this component
import Header from './Header';                     // Header component
import Footer from './Footer';                     // Footer component
//===================================================================================================================


function ProductList() {
  
  const [products, setProducts] = useState([]);    // State to store the list of products
  const navigate = useNavigate();                  // Hook to programmatically navigate to other routes

  // Utility function to shuffle the products randomly
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
//===================================================================================================================
  
  useEffect(() => {                                // useEffect to fetch products from the API when the component loads
    fetch('https://fakestoreapi.com/products')     // Fetch product data from external API
      .then(res => res.json())                     // Convert response to JSON
      .then(data => {
        const shuffled = shuffleArray(data);       // Randomize the order of products
        setProducts(shuffled.slice(0, 6));          // Take the first 6 products and save them in state
      });
  }, []);                                           // Empty dependency array ensures this runs only once on component mount



  //===================================================================================================================
  // Function to show a sustainability-related fun fact in an alert
  const showCoolFact = () => {
    alert('🌍 Buying second-hand clothes can save up to 79% of CO2 emissions compared to buying new ones!');
  };

  return (
    <div className="homepage">
      
      {/* Top navigation header */}
      <Header />

      {/* Page title */}
      <h1 className="products-title">Happy Shopping!</h1>

      {/* Brief description about the purpose of the site */}
      <p className="products-description">
        Discover sustainable deals and give items a second life!
      </p>

      {/* Grid of product cards */}
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate("/products/" + product.id, { state: { product } })} // Navigate to the product detail page on click
          >
            <img src={product.image} alt={product.title} /> {/* Product image */}
            <h3>{product.title}</h3> {/* Product title */}
            <p>{product.description.slice(0, 100)}...</p> {/* Shortened product description */}
            <p className="product-price">${product.price}</p> {/* Product price */}
          </div>
        ))}
      </div>
//===================================================================================================================
      {/* Button to display a fun eco-friendly fact */}
      <div className="view-all-container">
        <button className="view-all-button" onClick={showCoolFact}>
          Want to Know Something Cool?
        </button>
      </div>

      {/* Bottom footer */}
      <Footer />

    </div>
  );
}

export default ProductList;
