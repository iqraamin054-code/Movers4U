import { useState } from "react";
import contactImage from "../assets/images/contactImage.png";
import API from "../api";
import "../styles.css";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState("GENERAL QUESTION");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const tabs = ["BUYING", "SELLING", "RENTALS", "GENERAL QUESTION"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await API.post("/api/contact/submit", {
        ...formData,
        category: activeTab,
      });

      setSuccessMessage(response.data?.message || "Your inquiry has been received. Our team will get back to you shortly.");
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to submit your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section" style={{ backgroundImage: `url(${contactImage})` }}>
      <div className="contact-overlay"></div>
      <div className="contact-content">
        <p className="contact-subtitle">GET IN TOUCH</p>
        <h2 className="contact-title">CONTACT US</h2>

        <div className="contact-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`contact-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {success ? (
          <div className="contact-success-box animate-fade-in-up">
            <div className="contact-success-icon-wrapper">
              <svg className="contact-success-svg" viewBox="0 0 52 52">
                <circle className="contact-success-svg-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="contact-success-svg-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h3 className="contact-success-title">Response Submitted!</h3>
            <p className="contact-success-text">
              Your inquiry has been received. Our team will get back to you shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setError(null);
              }}
              className="contact-success-btn"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {error && <p className="contact-error-text">{error}</p>}

            <div className="contact-form-grid">
              <div>
                <label className="contact-form-label">NAME</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="contact-form-input" />
              </div>
              <div>
                <label className="contact-form-label">EMAIL</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="contact-form-input" />
              </div>
              <div>
                <label className="contact-form-label">PHONE</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="contact-form-input" />
              </div>
            </div>

            <div className="contact-form-textarea-wrapper">
              <label className="contact-form-label">MESSAGE</label>
              <textarea name="message" rows="4" value={formData.message} onChange={handleChange} required className="contact-form-textarea"></textarea>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "SUBMITTING..." : "SUBMIT +"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
