import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    contact: "",
    role: "buyer",
    cnic_number: ""
  });

  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (form.role === "seller") {
      data.append("cnic_front", cnicFront);
      data.append("cnic_back", cnicBack);
    }

    try {
      const res = await API.post("/api/auth/signup", data);

      alert(res.data.message);

      // move to OTP page
      navigate("/otp", { state: { userId: res.data.userId } });

    } catch (error) {
      console.error("Signup error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Signup failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container signup-container">
        <h2>Signup</h2>

        <form onSubmit={handleSignup}>
          <div className="form-row">
            <input name="first_name" placeholder="First Name" onChange={handleChange} />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} />
          </div>
          
          <div className="form-row">
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="contact" placeholder="Contact" onChange={handleChange} />
          </div>

          <div className="form-row">
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <select name="role" onChange={handleChange}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <input name="cnic_number" placeholder="CNIC Number" onChange={handleChange} />

          {form.role === "seller" && (
            <div className="form-row">
              <input type="file" onChange={(e) => setCnicFront(e.target.files[0])} />
              <input type="file" onChange={(e) => setCnicBack(e.target.files[0])} />
            </div>
          )}

          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;