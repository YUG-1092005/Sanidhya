import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Cards from "./Cards";
import ValueSection from "./ValueSection";
import TrustSection from "./TrustSection";
import NumbersSection from "./NumbersSection";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Homepage = ({ showToast }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // button navigation
  const handleStarted = () => {
    navigate("/user/register");
  };

  const handleLearnMore = () => {
    navigate("/aboutus");
  };
  return (
    <div>
      <div className="text">
        <h1>
          Connecting Organizations having Physically & Visually Impaired
          Individuals at
        </h1>
        <br />
        <span className="typing-text">Sanidhya</span>
      </div>
      <div className="getting-started">
        <button className="start-btn" onClick={handleStarted}>
          Getting Started
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="about-btn" onClick={handleLearnMore}>
          Learn More
        </button>
      </div>
      <Cards />
      <ValueSection />
      <TrustSection />
      <NumbersSection />
      <Testimonial />
      <FAQ />
    </div>
  );
};

export default Homepage;
