import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ProductDetails.css';


//======================== PRODUCT DETAILS COMPONENT =========================
function ProductDetails() {

  //======================== ROUTE AND STATE INITIALIZATION =========================
  // Access product data passed from previous route (if any)
  const { state } = useLocation();

  // Extract the product ID from the URL parameters (e.g. /products/5)
  const { id } = useParams();

  // Store either passed or fetched product information
  const [product, setProduct] = useState(state?.product || null);

  // Modal visibility state for request form
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form data for requesting the product
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    productId: id
  });


  //======================== FETCH PRODUCT DETAILS FROM API IF NOT PASSED =========================
  // If no product info was passed via state, fetch it from the fake store API using the product ID
  useEffect(() => {
    if (!state?.product) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error('Error fetching product:', err));
    }
  }, [id, state]);


  //======================== UPDATE FORM PRODUCT ID ON ROUTE CHANGE =========================
  // Ensures productId in the form stays in sync with the URL parameter
  useEffect(() => {
    setFormData((prev) => ({ ...prev, productId: id }));
  }, [id]);


  //======================== HANDLE FORM INPUT CHANGES =========================
  // Updates form fields as the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  //======================== HANDLE FORM SUBMISSION =========================
  // Sends form data to the backend API and closes modal if successful
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
        setIsModalOpen(false); // Close modal on success
      })
      .catch(() => alert('Error. Please try again.'));
  };


  //======================== LOADING STATE =========================
  // Display a loading message until the product data is available
  if (!product) return <div className="loading">Loading...</div>;


  //======================== RENDER PRODUCT DETAILS PAGE =========================
  return (
    <div className="product-details-page">

      {/* Layout: Left = Image, Right = Info */}
      <main className="product-details-container">

        {/* LEFT: Product image display */}
        <section className="product-images">
          <img 
            src={product.image} 
            alt={product.title} 
            className="main-image" 
          />
        </section>

        {/* RIGHT: Product information section */}
        <section className="product-info">
          <h2>{product.title}</h2>

          {/* Current and old (discounted) prices */}
          <div className="price-section">
            <span className="current-price">${product.price}</span>
            <span className="old-price">${(product.price + 50).toFixed(2)}</span>
          </div>

          {/* Static star rating */}
          <div className="rating">★★★★☆ (128 reviews)</div>

          {/* Product description */}
          <p className="description">{product.description}</p>

          {/* Seller details */}
          <article className="seller-card">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Seller John Smith" 
              className="seller-img" 
            /> <div className="seller-info">
            <h4>John Smith</h4>
            <p>New York, 12.5 miles away</p>
          </div>
        </article>

        {/* Button to open the request form modal */}
        <button 
          className="request-btn" 
          onClick={() => setIsModalOpen(true)}
        >
          Request
        </button>
      </section>
    </main>


    {/*======================== REQUEST MODAL ========================*/}
    {/* Modal appears only if isModalOpen is true */}
    {isModalOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Request Product</h2>

          {/* Form for submitting user details and delivery info */}
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
  </div>
);
}

export default ProductDetails;