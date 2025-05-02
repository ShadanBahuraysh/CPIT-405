import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ProductDetails.css';
import Header from './Header';
import Footer from './Footer';

function ProductDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(state?.product || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    productId: id
  });

  useEffect(() => {
    if (!state?.product) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error('Error fetching product:', err));
    }
  }, [id, state]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, productId: id }));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        setIsModalOpen(false);
      })
      .catch(() => alert('Error. Please try again.'));
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details-page">
      <Header />
      <main className="product-details-container">
        <section className="product-images">
          <img src={product.image} alt={product.title} className="main-image" />
        </section>

        <section className="product-info">
          <h2>{product.title}</h2>
          <div className="price-section">
            <span className="current-price">${product.price}</span>
            <span className="old-price">${(product.price + 50).toFixed(2)}</span>
          </div>
          <div className="rating">★★★★☆ (128 reviews)</div>
          <p className="description">{product.description}</p>

          <article className="seller-card">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Seller John Smith" className="seller-img" />
            <div className="seller-info">
              <h4>John Smith</h4>
              <p>New York, 12.5 miles away</p>
            </div>
            <div className="seller-actions">
              <button className="contact-btn">Contact Seller</button>
              <button className="wishlist-btn">Add to Wishlist</button>
            </div>
          </article>

          <button className="request-btn" onClick={() => setIsModalOpen(true)}>
            Request
          </button>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Request Product</h2>
            <form onSubmit={handleSubmit} className="request-form">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              <button type="submit" className="submit-btn">Submit Request</button>
            </form>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetails;