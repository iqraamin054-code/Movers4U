import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import API from "../api";

import buyerImage from "../assets/images/BuyerImage.png";

const Seller = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "House",
    size: "",
    rooms: "",
    price: "",
    city: "",
    address: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token && role === "seller") {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 5) {
      alert("You can only upload up to 5 images.");
      e.target.value = ""; // reset
      return;
    }
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const token = localStorage.getItem("token");
      await API.post("/api/houses/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      setMessage("Your property has been listed successfully and is pending approval!");
      setFormData({
        title: "", description: "", category: "House", size: "", rooms: "", price: "", city: "", address: ""
      });
      // reset file input visually if needed
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
      setImages([]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong while listing your property.");
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return <div className="seller-loading-container"></div>;
  }

  if (!isAuth) {
    const hasToken = !!localStorage.getItem("token");
    return (
      <div className="seller-unauth-container">
        
        {/* Top Banner Image */}
        <div className="about-banner-wrapper">
          <img src={buyerImage} alt="Seller Access" className="about-banner-img" />
          <div className="about-banner-overlay">
            <h1 className="about-banner-title">Seller Portal</h1>
            <p className="about-banner-desc">
              Connect with thousands of potential buyers and showcase your home today.
            </p>
          </div>
        </div>

        <div className="seller-intro-container">
          <h2 className="seller-intro-title">List Your Property with Movers4U</h2>
          {hasToken ? (
            <p className="seller-intro-text">
              It looks like you are logged in with a <strong>Buyer</strong> account. 
              Only registered <strong>Sellers</strong> are allowed to list properties on Movers4U.
              <br/><br/>
              To list a property, please log out and sign up or log in with a Seller account!
            </p>
          ) : (
            <p className="seller-intro-text">
              Looking to sell or rent out your property? Movers4U provides a premium platform to showcase your real estate to thousands of potential buyers across the country. Our streamlined process ensures your property gets the visibility it deserves. 
              <br/><br/>
              To maintain a high-quality and secure marketplace, we require all our sellers to be registered. Join us today and connect with buyers instantly!
            </p>
          )}

          <div className="seller-cta-box">
            <h3 className="seller-cta-title">{hasToken ? "Need a Seller Account?" : "Ready to get started?"}</h3>
            <p className="seller-cta-text">
              {hasToken 
                ? "Please log out of your current account and log in or register as a Seller to start listing properties."
                : "Login or create a new seller account to access your dashboard and start listing properties."}
            </p>
            {hasToken ? (
              <button 
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userRole");
                  // Dispatch custom event to notify Navbar
                  window.dispatchEvent(new Event("authChange"));
                  navigate("/login");
                }}
                className="seller-cta-btn"
              >
                Logout & Login as Seller
              </button>
            ) : (
              <button 
                onClick={() => navigate("/login")}
                className="seller-cta-btn"
              >
                Login / Signup to Continue
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-unauth-container">
      {/* Top Banner Image */}
      <div className="about-banner-wrapper">
        <img src={buyerImage} alt="Seller Access" className="about-banner-img" />
        <div className="about-banner-overlay">
          <h1 className="about-banner-title">Seller Portal</h1>
          <p className="about-banner-desc">
            Manage your listings and reach thousands of prospective buyers.
          </p>
        </div>
      </div>

      <div className="seller-intro-container">
        <div className="seller-form-container">
          <h2>List Your Property</h2>

          {message && <p className="seller-success-msg">{message}</p>}
          {error && <p className="seller-error-msg">{error}</p>}

          <form onSubmit={handleSubmit} className="seller-form" encType="multipart/form-data">
            <input
              type="text" name="title" placeholder="Property Title (e.g., Luxury Villa in DHA)"
              className="seller-input form-full-width" value={formData.title} onChange={handleChange} required
            />

            <select name="category" className="seller-input" value={formData.category} onChange={handleChange} required>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Portion">Portion</option>
            </select>

            <input
              type="number" name="price" placeholder="Price (PKR)"
              className="seller-input" value={formData.price} onChange={handleChange} required
            />

            <input
              type="text" name="size" placeholder="Size (e.g., 5 Marla, 1000 sqft)"
              className="seller-input" value={formData.size} onChange={handleChange} required
            />

            <input
              type="number" name="rooms" placeholder="Number of Rooms"
              className="seller-input" value={formData.rooms} onChange={handleChange} required
            />

            <input
              type="text" name="city" placeholder="City"
              className="seller-input" value={formData.city} onChange={handleChange} required
            />

            <input
              type="text" name="address" placeholder="Full Address"
              className="seller-input" value={formData.address} onChange={handleChange} required
            />

            <textarea
              name="description" placeholder="Detailed Description..."
              className="seller-input form-full-width" value={formData.description} onChange={handleChange} required
            />

            <div className="file-input-wrapper form-full-width">
              <p>Upload property images (Max 5)</p>
              <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} required />
            </div>

            <button type="submit" className="btn-submit form-full-width seller-submit-btn" disabled={loading}>
              {loading ? "LISTING PROPERTY..." : "SUBMIT LISTING +"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Seller;
