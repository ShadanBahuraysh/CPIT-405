import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import Header from './Header';
import Footer from './Footer';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',   // ← استخدمنا address بدل city
    productId: ''
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Error fetching product details:', err));
  }, [id]);

  // تحديث productId
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Server Response:', data);
        alert('Your request has been submitted successfully!');
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error('Error submitting request:', err);
        alert('Something went wrong. Please try again.');
      });
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-details-page">
      <Header />

      {/* Product Details */}
      <div className="product-details-container">
        <div className="product-images">
          <img src={product.image} alt={product.title} className="main-image" />
          <div className="thumbnail-grid">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={product.image} alt="Thumbnail" className="thumbnail" />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h2>{product.title}</h2>
          <div className="price-section">
            <span className="current-price">${product.price}</span>
            <span className="old-price">${(product.price + 50).toFixed(2)}</span>
          </div>
          <div className="rating">★★★★☆ (128 reviews)</div>
          <p className="description">{product.description}</p>

          <div className="seller-card">
            <img src="/john-smith.jpg" alt="Seller" className="seller-img" />
            <div className="seller-info">
              <h4>John Smith</h4>
              <p>New York, 12.5 miles away</p>
            </div>
            <div className="seller-actions">
              <button className="contact-btn">Contact Seller</button>
              <button className="wishlist-btn">Add to Wishlist</button>
            </div>
          </div>

          <button className="request-btn" onClick={() => setIsModalOpen(true)}>
            Request
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Request Product</h2>
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
                name="address"   // ← هنا غيرنا الاسم
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
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
