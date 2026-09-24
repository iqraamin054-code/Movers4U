import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password
      });
      const role = res.data.user.role;

      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.user.role);

      // Notify other components (Navbar) of auth status change
      window.dispatchEvent(new Event("authChange"));

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "seller") {
        navigate("/seller");
      } else {
        navigate("/buyer");
      }

    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Login failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        
        <h2 className="auth-title">Login</h2>

        <div className="auth-input-group">
          <label className="auth-label">Email address</label>
          <input 
            placeholder="Enter email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="auth-input"
          />
        </div>

        <div className="auth-input-group relative-group">
          <label className="auth-label">Password</label>
          <div className="password-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="auth-input password-input"
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-icon"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              )}
            </span>
          </div>
        </div>

        <div className="auth-forgot-password">
          <span onClick={() => navigate("/forgot-password")} className="auth-link">
            Forgot password?
          </span>
        </div>

        <button 
          onClick={login} 
          className="auth-submit-btn"
        >
          Login
        </button>
        
        <p className="auth-footer-text">
          If you are a new user please <span onClick={() => navigate("/signup")} className="auth-link font-bold">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;