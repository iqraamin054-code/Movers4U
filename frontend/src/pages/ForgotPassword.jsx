import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    try {
      const res = await API.post("/api/auth/forgot-password", { email });
      alert(res.data.message);
      // Redirect to Reset Password page and pass the email so user doesn't have to type it again
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("Forgot Password error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to process request";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle" style={{ marginBottom: "20px" }}>
          Enter your email address to receive a password reset OTP.
        </p>

        <div className="auth-input-group">
          <label className="auth-label">Email address</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
        </div>

        <button onClick={handleForgotPassword} className="auth-submit-btn">
          Send OTP
        </button>

        <p className="auth-footer-text">
          Remember your password?{" "}
          <span onClick={() => navigate("/login")} className="auth-link font-bold">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
