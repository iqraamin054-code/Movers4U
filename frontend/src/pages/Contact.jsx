import React, { useState } from "react";
import buyerImage from "../assets/images/buyerImage.png";
import interior3 from "../assets/images/interior3.png";
import API from "../api";
import "../styles.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await API.post("/api/contact/submit", formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "General Inquiry",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to submit your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-container">
      {/* 1. Contact Banner / Hero Image */}
      <div className="contact-banner-wrapper">
        <img src={buyerImage} alt="Contact Us Banner" className="contact-banner-img" />
        <div className="contact-banner-overlay">
          <h1 className="contact-banner-title">Contact Us</h1>
          <p className="contact-banner-desc">
            We're here to answer your questions and help you with your real estate needs.
          </p>
        </div>
      </div>

      {/* 2. Theme-matched Contact Form Section */}
      <div className="theme-contact-section">
        {/* Dark Background Header with Interior Image */}
        <div 
          className="theme-contact-header" 
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${interior3})` }}
        >
          <div className="theme-contact-header-content">
            <h2 className="theme-company-title">MOVERS 4 U</h2>
            
            <div className="theme-contact-meta-row">
              <a href="tel:+923001234567" className="theme-meta-item theme-meta-link">
                <svg className="theme-meta-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+92 300 1234567</span>
              </a>
              
              <a href="mailto:info@movers4u.com" className="theme-meta-item theme-meta-link">
                <svg className="theme-meta-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>info@movers4u.com</span>
              </a>

              <a
                href="https://www.google.com/maps/search/Islamabad+Capital+Territory,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-meta-item theme-meta-link"
              >
                <svg className="theme-meta-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
                <span>Islamabad Capital Territory, Pakistan</span>
              </a>
            </div>

            <div className="theme-social-row">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="theme-social-link" title="Facebook">
                <svg className="theme-social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="theme-social-link" title="Instagram">
                <svg className="theme-social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="theme-social-link" title="LinkedIn">
                <svg className="theme-social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Overlapping White Form Card */}
        <div className="theme-form-card">
          <h2 className="theme-form-card-title">GET IN TOUCH</h2>

          {success ? (
            <div className="theme-success-box animate-fade-in-up">
              <div className="theme-success-icon-wrapper">
                <svg className="theme-success-svg" viewBox="0 0 52 52">
                  <circle className="theme-success-svg-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="theme-success-svg-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>
              <h3 className="theme-success-title">Message Sent!</h3>
              <p className="theme-success-text">
                Thank you! Your message has been received. Our team will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="theme-success-btn"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="theme-contact-form">
              {error && <p className="theme-error-text">{error}</p>}

              {/* 3 columns row: Name, Phone, Email */}
              <div className="theme-form-row">
                <div className="theme-input-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                    className="theme-line-input"
                  />
                </div>
                
                <div className="theme-input-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="theme-line-input"
                  />
                </div>

                <div className="theme-input-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="theme-line-input"
                  />
                </div>
              </div>

              {/* Row for Category Select */}
              <div className="theme-form-select-group">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="theme-line-select"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Buying">Buying</option>
                  <option value="Selling">Selling</option>
                  <option value="Rentals">Rentals</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              {/* Full width row: Message & Send icon button */}
              <div className="theme-message-wrapper">
                <textarea
                  name="message"
                  rows="1"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Message"
                  className="theme-line-textarea"
                ></textarea>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="theme-airplane-btn"
                  title="Send Message"
                >
                  <svg className="theme-airplane-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 3. Google Map Section */}
      <div className="contact-map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106283.47352329813!2d72.96913501062061!3d33.665330386762314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
          className="contact-map-iframe"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
