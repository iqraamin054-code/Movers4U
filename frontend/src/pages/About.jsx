import React from "react";
import "../styles.css";
import aboutImg from "../assets/images/aboutImage.png";
import buyerImage from "../assets/images/buyerImage.png";
import houseImage from "../assets/images/image5.png";
import interior1 from "../assets/images/interior1.png";
import interior3 from "../assets/images/interior3.png";

const About = () => {
  return (
    <div className="about-page-container">

      {/* Top Banner Image */}
      <div className="about-banner-wrapper">
        <img src={buyerImage} alt="About Us Banner" className="about-banner-img" />
        <div className="about-banner-overlay">
          <h1 className="about-banner-title">About Movers4U</h1>
          <p className="about-banner-desc">
            Redefining the real estate and moving experience across the nation.
          </p>
        </div>
      </div>

      <div className="about-content-container">

        {/* Introduction Section (Image and Text) */}
        <div className="about-intro-section">

          <div className="about-intro-image-wrapper">
            <img src={aboutImg} alt="Introduction" className="about-intro-img" />
          </div>

          <div className="about-intro-text-wrapper">
            <h2 className="about-section-title">Who We Are</h2>
            <p className="about-text-paragraph">
              At Movers4U, we bridge the gap between buyers and sellers, providing a seamless, transparent, and premium experience for all your real estate needs.
            </p>
            <p className="about-text-paragraph">
              We believe that moving should be an exciting journey, not a stressful chore. Our platform is meticulously designed to connect buyers with the perfect properties and empower sellers to reach the right audience efficiently.
            </p>
            <p className="about-text-paragraph">
              By leveraging modern technology and a network of trusted professionals, we ensure every transaction is handled with the utmost care, transparency, and expertise.
            </p>
          </div>

        </div>

        {/* Showcase Section */}
        <div className="about-showcase-section">
          <div className="about-showcase-header">
            <h2 className="about-section-title-center">The Movers4U Standard</h2>
            <p className="about-showcase-desc">
              We don't just list properties; we showcase premium lifestyles. Experience the quality and elegance you deserve with every home.
            </p>
          </div>

          <div className="about-showcase-grid">
            <div className="about-showcase-main-img-wrapper">
              <img src={houseImage} alt="Premium House Exterior" className="about-showcase-img hover-zoom" />
            </div>
            <div className="about-showcase-subgrid">
              <div className="about-showcase-subimg-wrapper">
                <img src={interior1} alt="Premium Interior Living Space" className="about-showcase-img hover-zoom" />
              </div>
              <div className="about-showcase-subimg-wrapper">
                <img src={interior3} alt="Premium Interior Details" className="about-showcase-img hover-zoom" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="about-features-grid">
          <div className="about-feature-card">
            <div className="about-feature-icon">🤝</div>
            <h3 className="about-feature-title">Trusted Network</h3>
            <p className="about-feature-desc">We connect you with verified buyers and sellers to ensure secure and reliable transactions every time.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-icon">⚡</div>
            <h3 className="about-feature-title">Seamless Experience</h3>
            <p className="about-feature-desc">Our platform is built to eliminate friction. From browsing to closing, we make the process effortless.</p>
          </div>
          <div className="about-feature-card">
            <div className="about-feature-icon">🏆</div>
            <h3 className="about-feature-title">Expert Guidance</h3>
            <p className="about-feature-desc">Our dedicated support team and resources are always here to guide you through every step of your journey.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
