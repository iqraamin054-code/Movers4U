import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Start from "./pages/Start";
import About from "./pages/About";
import Buyer from "./pages/Buyer";
import Seller from "./pages/Seller";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideContactRoutes = ["/login", "/signup", "/otp", "/forgot-password", "/reset-password"];
  const showContact = !hideContactRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      {children}
      {showContact && (
        <>
          <ContactSection />
          <Footer />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/about" element={<About />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/admin" element ={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;