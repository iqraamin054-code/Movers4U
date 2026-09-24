import React, { useState } from "react";
import API from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;

  const verifyOTP = async () => {
    try {
      const res = await API.post("/api/otp/verify", {
        userId,
        otp
      });

      alert(res.data.message);
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const resendOTP = async () => {
    try {
      const res = await API.post("/api/otp/resend", { userId });
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h2>OTP Verification</h2>
        <p className="otp-subtitle">Please check your email/phone for the OTP.</p>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="otp-input"
        />

        <button onClick={verifyOTP} className="btn-submit otp-submit-btn">Verify OTP</button>
        
        <p className="otp-footer-text">
          Didn't receive code or expired?{" "}
          <span 
            onClick={resendOTP} 
            className="otp-resend-link"
          >
            Resend OTP
          </span>
        </p>
      </div>
    </div>
  );
};

export default OTP;