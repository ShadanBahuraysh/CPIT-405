import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ProductDetails.css';
import Header from './Header';
import Footer from './Footer';

function ProductDetails() {
  // Get passed product state (if any) from the previous route
  const { state } = useLocation();

  // Extract product ID from the URL parameters
  const { id } = useParams();

  // Store the product details (either passed or fetched)
  const [product, setProduct] = useState(state?.product || null);

  // Track whether the request modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Store user input from the request form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    productId: id
  });

  // If no product was passed through state, fetch it from the API
  useEffect(() => {
    if (!state?.product) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error('Error fetching product:', err));
    }
  }, [id, state]);

  // Always update productId in form when route param changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, productId: id }));
  }, [id]);

  // Update form state as the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission and send data to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost/server/submit_order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => {
        alert('Your request has been submitted!');
        setIsModalOpen(false); // Close modal after success
      })
      .catch(() => alert('Error. Please try again.'));
  };

  // Show loading message until product data is available
  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details-page">
      <Header />

      {/* Main content section with image and details */}
      <main className="product-details-container">

        {/* Left: Product image display */}
        <section className="product-images">
          <img 
            src={product.image} 
            alt={product.title} 
            className="main-image" 
          />
        </section>

        {/* Right: Product information */}
        <section className="product-info">
          {/* Product title */}
          <h2>{product.title}</h2>

          {/* Price section: current and old prices */}
          <div className="price-section">
            <span className="current-price">${product.price}</span>
            <span className="old-price">${(product.price + 50).toFixed(2)}</span>
          </div>

          {/* Static rating display */}
          <div className="rating">★★★★☆ (128 reviews)</div>

          {/* Product description */}
          <p className="description">{product.description}</p>

          {/* Seller card with image, name, and buttons */}
          <article className="seller-card">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Seller John Smith" 
              className="seller-img" 
            />
            <div className="seller-info">
              <h4>John Smith</h4>
              <p>New York, 12.5 miles away</p>
            </div>

            {/* Action buttons: contact and wishlist */}
            <div className="seller-actions">
              <button className="contact-btn">Contact Seller</button>
              <button className="wishlist-btn">Add to Wishlist</button>
            </div>
          </article>

          {/* Open request modal */}
          <button 
            className="request-btn" 
            onClick={() => setIsModalOpen(true)}
          >
            Request
          </button>
        </section>
      </main>

      {/* Modal popup for submitting a product request */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Request Product</h2>

            {/* Form inputs for request */}
            <form onSubmit={handleSubmit} className="request-form">
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
              <button type="submit" className="submit-btn">Submit Request</button>
            </form>

            {/* Close modal button */}
            <button 
              className="close-btn" 
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetails;
