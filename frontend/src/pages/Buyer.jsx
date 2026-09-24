import React, { useState, useEffect } from "react";
import "../styles.css";
import API from "../api";

import buyerImage from "../assets/images/buyerImage.png";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.png";
import image9 from "../assets/images/image9.png";
import image10 from "../assets/images/image10.png";
import image11 from "../assets/images/image11.png";
import image12 from "../assets/images/image12.png";
import interior1 from "../assets/images/interior1.png";
import interior2 from "../assets/images/interior2.png";
import interior3 from "../assets/images/interior3.png";
import interior4 from "../assets/images/interior4.png";
import interior5 from "../assets/images/interior5.png";
import interior6 from "../assets/images/interior6.png";
import interior7 from "../assets/images/interior7.png";
import interior8 from "../assets/images/interior8.png";

const dummyHouses = [
  {
    id: 'd1', title: 'Luxury Villa with Pool', city: 'Islamabad', price: 45000000, category: 'House', rooms: 6, size: '1 Kanal', address: 'Sector E-7', description: 'A stunning modern luxury villa featuring a private pool and beautiful views.', images: JSON.stringify([image1, interior5, interior6, interior7, interior8])
  },
  {
    id: 'd2', title: 'Modern Apartment', city: 'Lahore', price: 15000000, category: 'Apartment', rooms: 3, size: '1200 Sqft', address: 'Gulberg III', description: 'Beautifully designed modern apartment in the heart of Lahore.', images: JSON.stringify([image2, interior6, interior5, interior8])
  },
  {
    id: 'd3', title: 'Cozy Family House', city: 'Karachi', price: 25000000, category: 'House', rooms: 4, size: '250 Sqyd', address: 'DHA Phase 6', description: 'A well-maintained family home in a secure and peaceful neighborhood.', images: JSON.stringify([image3, interior4, interior3])
  },
  {
    id: 'd4', title: 'Executive Portion', city: 'Islamabad', price: 8000000, category: 'Portion', rooms: 2, size: '10 Marla', address: 'F-11', description: 'Upper portion of an executive house with separate entrance.', images: JSON.stringify([image4, interior1, interior4])
  },
  {
    id: 'd5', title: 'Seaview Apartment', city: 'Karachi', price: 32000000, category: 'Apartment', rooms: 4, size: '2000 Sqft', address: 'Clifton', description: 'Luxurious apartment overlooking the sea.', images: JSON.stringify([image5, interior2, interior3])
  },
  {
    id: 'd6', title: 'Downtown Penthouse', city: 'Lahore', price: 65000000, category: 'Apartment', rooms: 5, size: '4000 Sqft', address: 'DHA Phase 5', description: 'An exquisite penthouse with panoramic city views.', images: JSON.stringify([image6, interior3, interior1, interior4])
  },
  {
    id: 'd7', title: 'Suburban Farmhouse', city: 'Islamabad', price: 85000000, category: 'House', rooms: 8, size: '4 Kanal', address: 'Bani Gala', description: 'Spacious farmhouse with lush green lawns and modern amenities.', images: JSON.stringify([image7, interior4, interior2, interior1])
  },
  {
    id: 'd8', title: 'Minimalist Studio', city: 'Lahore', price: 9000000, category: 'Apartment', rooms: 1, size: '500 Sqft', address: 'Model Town', description: 'A perfectly sized studio apartment with modern minimalist aesthetic.', images: JSON.stringify([image8, interior5, interior7])
  },
  {
    id: 'd9', title: 'Grand Estate', city: 'Karachi', price: 120000000, category: 'House', rooms: 10, size: '2000 Sqyd', address: 'DHA Phase 8', description: 'A massive luxury estate offering unparalleled privacy and premium finishes.', images: JSON.stringify([image9, interior6, interior8, interior7])
  },
  {
    id: 'd10', title: 'Classic Townhouse', city: 'Islamabad', price: 28000000, category: 'House', rooms: 5, size: '10 Marla', address: 'F-8', description: 'A timeless townhouse situated in a lush, green neighborhood with modern upgrades.', images: JSON.stringify([image10, interior5, interior8])
  },
  {
    id: 'd11', title: 'Skyline Penthouse', city: 'Karachi', price: 95000000, category: 'Apartment', rooms: 4, size: '3500 Sqft', address: 'Clifton Block 4', description: 'Experience the height of luxury in this fully upgraded penthouse with 360-degree views.', images: JSON.stringify([image11, interior5, interior6, interior8])
  },
  {
    id: 'd12', title: 'Cozy Cottage', city: 'Murree', price: 18000000, category: 'House', rooms: 3, size: '5 Marla', address: 'Bhurban', description: 'A serene getaway cottage nestled in the beautiful mountains with cozy interiors.', images: JSON.stringify([image12, interior7, interior5, interior6])
  }
];

const Buyer = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
  const fetchHouses = async () => {
    try {
      const res = await API.get("/api/houses/approved");

      const fetchedHouses = Array.isArray(res.data)
        ? res.data
        : [];

      setHouses(fetchedHouses);
    } catch (err) {
      setError("Failed to load houses. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchHouses();
}, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http") || imagePath.startsWith("data:") || imagePath.startsWith("/")) return imagePath; // Local imports start with / in Vite
    const formattedPath = imagePath.replace(/\\/g, "/");
    return `http://localhost:5000/${formattedPath}`;
  };

  const displayHouses = [
  ...(Array.isArray(houses) ? houses : []),
  ...dummyHouses
];

  return (
    <div className="buyer-page-container">

      {/* Top Banner Image */}
      <div className="about-banner-wrapper">
        <img src={buyerImage} alt="Explore Properties" className="about-banner-img" />
        <div className="about-banner-overlay">
          <h1 className="about-banner-title">Find Your Dream Home</h1>
          <p className="about-banner-desc">
            Discover modern, premium, and cozy properties curated just for you.
          </p>
        </div>
      </div>

      <div className="buyer-content-container">
        {loading && <p className="buyer-loading-text">Loading properties...</p>}
        {error && <p className="buyer-error-text">{error}</p>}

        {/* PURE IMAGE GALLERY GRID */}
        <div className="masonry-grid pure-gallery">
          {displayHouses.map((house) => {
            let coverImage = "";
            try {
              const parsedImages = typeof house.images === 'string' ? JSON.parse(house.images) : house.images;
              coverImage = (parsedImages && parsedImages.length > 0) ? getImageUrl(parsedImages[0]) : "";
            } catch (e) {
              console.error("Error parsing images", e);
            }

            return (
              <div key={house.id} className="masonry-item gallery-item buyer-gallery-item-wrapper" onClick={() => setSelectedHouse(house)}>
                {coverImage ? (
                  <img src={coverImage} alt={house.title} />
                ) : (
                  <div className="buyer-gallery-no-image">
                    No Image
                  </div>
                )}
                
                {/* Adding text overlay back as requested */}
                <div className="masonry-item-overlay buyer-gallery-item-overlay">
                  <h3 className="buyer-gallery-item-title">{house.title}</h3>
                  <p className="buyer-gallery-item-desc">{house.city} • PKR {house.price?.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HOUSE DETAILS MODAL (Kept exactly the same) */}
      {selectedHouse && (
        <div className="house-modal-overlay" onClick={() => setSelectedHouse(null)}>
          <div className="house-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedHouse(null)}>&times;</button>

            <div className="buyer-modal-image-section">
              {(() => {
                let images = [];
                try {
                  images = typeof selectedHouse.images === 'string' ? JSON.parse(selectedHouse.images) : selectedHouse.images;
                } catch (e) { }

                if (!images || images.length === 0) {
                  return <div className="buyer-modal-no-image">No images available</div>;
                }

                return (
                  <div>
                    {/* Main Featured Image */}
                    <div className="buyer-modal-main-image-wrapper">
                      <img src={getImageUrl(images[0])} alt="Main View" className="buyer-modal-main-img" />
                    </div>
                    {/* Interior Thumbnails Grid */}
                    {images.length > 1 && (
                      <div 
                        className="buyer-modal-thumbnails-grid" 
                        style={{ gridTemplateColumns: `repeat(${Math.min(images.length - 1, 4)}, 1fr)` }}
                      >
                        {images.slice(1, 5).map((img, idx) => (
                          <div key={idx} className="buyer-modal-thumbnail-wrapper">
                            <img src={getImageUrl(img)} alt={`Interior ${idx + 1}`} className="buyer-modal-thumbnail-img hover-zoom" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="modal-details">
              <h2>{selectedHouse.title}</h2>
              <div className="modal-price">PKR {selectedHouse.price?.toLocaleString()}</div>

              <div className="modal-info-grid">
                <div><span>Category:</span> {selectedHouse.category}</div>
                <div><span>Rooms:</span> {selectedHouse.rooms}</div>
                <div><span>Size:</span> {selectedHouse.size}</div>
                <div><span>City:</span> {selectedHouse.city}</div>
                <div className="buyer-modal-address"><span>Address:</span> {selectedHouse.address}</div>
              </div>

              <p className="buyer-modal-description">
                {selectedHouse.description}
              </p>

              <button className="modal-buy-btn" onClick={() => alert("Contact seller feature coming soon!")}>
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buyer;
