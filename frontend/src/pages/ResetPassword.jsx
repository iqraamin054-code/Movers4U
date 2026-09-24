import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";
import "../styles.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async () => {
    if (!email || !otp || !newPassword) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await API.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Reset Password error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to reset password";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle" style={{ marginBottom: "20px" }}>
          Enter the OTP sent to your email and your new password.
        </p>

        <div className="auth-input-group">
          <label className="auth-label">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            disabled={!!location.state?.email} // Disable if passed from previous screen
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label">OTP Code</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="auth-input"
          />
        </div>

        <div className="auth-input-group relative-group">
          <label className="auth-label">New Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

        <button onClick={handleResetPassword} className="auth-submit-btn">
          Reset Password
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

export default ResetPassword;
