import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import logoImg from "../assets/images/Movers 4U_logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsAuth(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logoImg} alt="Movers4U" className="logo-img" />
      </div>
      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/buyer")}>Buyer</li>
        <li onClick={() => navigate("/seller")}>Seller</li>
        <li onClick={() => navigate("/contact")}>Contact</li>
      </ul>
      <div className="nav-actions">
        {isAuth ? (
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
