import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import logoImg from "../assets/images/logo.png";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.png";
import image9 from "../assets/images/image9.png";
import cardImageBuy from "../assets/images/cardimagebuy.png";
import cardImageSell from "../assets/images/cardImagesell.png";

const images = [image6, image7, image8, image9];

const Start = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="slider-background">
          {images.map((img, index) => (
            <div
              key={index}
              className={`slide ${index === currentImage ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="slider-overlay" />
        </div>

        <div className="hero-section">
          <div className="container">
            <h2>Movers4U</h2>
            <p>Welcome to Moving Services Platform</p>
          </div>
        </div>
      </div>

      {/* Action Cards Section */}
      <div className="action-cards-section">
        <div className="action-cards-grid">

          {/* Buy Card */}
          <div className="action-card" onClick={() => navigate("/buyer")}>
            <div className="action-card-icon-wrapper">
              <img src={cardImageBuy} alt="Buy a home" className="action-card-img" />
            </div>
            <h3 className="action-card-title">Buy a home</h3>
            <p className="action-card-desc">
              Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.
            </p>
            <button className="action-card-btn">
              Search homes
            </button>
          </div>

          {/* Sell Card */}
          <div className="action-card" onClick={() => navigate("/seller")}>
            <div className="action-card-icon-wrapper">
              <img src={cardImageSell} alt="Sell a home" className="action-card-img" />
            </div>
            <h3 className="action-card-title">Sell a home</h3>
            <p className="action-card-desc">
              No matter what path you take to sell your home, we can help you navigate a successful sale with expert guidance.
            </p>
            <button className="action-card-btn">
              See your options
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Start;