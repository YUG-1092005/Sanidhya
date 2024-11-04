import React, { useState, useEffect } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <div className="cards">
      <Link to="/mobility" style={{ textDecoration: "none" }}>
        <div className="card1">
          <img src="/HomeImg_6.png" className="homeimg" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h2>Mobility</h2>
            <span className="arrow-el">
              <lord-icon
                src="https://cdn.lordicon.com/whtfgdfm.json"
                trigger="hover"
                colors="primary:#1c5e94"
              ></lord-icon>
            </span>
          </div>
        </div>
      </Link>
      <Link to="/vision" style={{ textDecoration: "none" }}>
        <div className="card2">
          <img src="/HomeImg_8.png" className="homeimg" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h2>Vision</h2>
            <span className="arrow-el">
              <lord-icon
                src="https://cdn.lordicon.com/whtfgdfm.json"
                trigger="hover"
                colors="primary:#1c5e94"
              ></lord-icon>
            </span>
          </div>
        </div>
      </Link>
      <Link to="rehabilitate" style={{ textDecoration: "none" }}>
        <div className="card3">
          <img src="/HomeImg_7.jpg" className="homeimg" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h2>Rehabilitation</h2>
            <span className="arrow-el">
              <lord-icon
                src="https://cdn.lordicon.com/whtfgdfm.json"
                trigger="hover"
                colors="primary:#1c5e94"
              ></lord-icon>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Cards;
