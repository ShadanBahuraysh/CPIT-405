/**
 * ProductDetails.js 
 * Displays detailed information for a single product, including image, title,
 * price, description, seller info, and allows the user to request the product
 * via a modal form. Fetches product data if not passed via React Router state.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ProductDetails.css';

/** ============  props.src - Image source URL + props.alt - Alt text for the image ============= */
function ProductImage({ src, alt }) {
  return <img src={src} alt={alt} className="main-image" />;
}

/** ==============ProductInfo :Displays product title, price, description, seller info, and a request button.======================*/

function ProductInfo({ title, price, description, onRequest }) {
  return (
    <section className="product-info">
      <h2>{title}</h2>
      <div className="price-section">
        <span className="current-price">${price}</span>
        <span className="old-price">${(price + 50).toFixed(2)}</span>
      </div>
      <div className="rating">★★★★☆ (128 reviews)</div>
      <p className="description">{description}</p>

      {/* Seller details */}
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
      </article>

      <button className="request-btn" onClick={onRequest}>
        Request
      </button>
    </section>
  );
}
/**================= RequestModal:  Presents a modal form for the user to request the product.==========================*/

function RequestModal({ isOpen, formData, onChange, onSubmit, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Request Product</h2>
        <form onSubmit={onSubmit} className="request-form">
          {['name', 'email', 'phone', 'address'].map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={onChange}
              required
            />
          ))}
          <button type="submit" className="submit-btn">Submit Request</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
/**================= ProductDetails: Main component that handles fetching product data, state management,
  and renders child components for product image, info, and request modal.================*/
export default function ProductDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(state?.product || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    productId: id,
  });

    // Fetch product details if not provided via navigation state
  useEffect(() => {
    if (!state?.product) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error('Error fetching product:', err));
    }
  }, [id, state]);

    // Update when route id changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, productId: id }));
  }, [id]);
  // Handle form input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost/server/submit_order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(() => {
        alert('Your request has been submitted!');
        setIsModalOpen(false);
      })
      .catch(() => alert('Error. Please try again.'));
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details-page">
      <main className="product-details-container">
        <section className="product-images">
          <ProductImage src={product.image} alt={product.title} />
        </section>
        <ProductInfo
          title={product.title}
          price={product.price}
          description={product.description}
          onRequest={() => setIsModalOpen(true)}
        />
      </main>
      <RequestModal
        isOpen={isModalOpen}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
