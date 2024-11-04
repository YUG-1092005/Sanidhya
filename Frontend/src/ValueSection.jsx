import React from "react";
import "./ValueSection.css";

const ValueSection = () => {
  return (
    <div>
      <div className="values" style={{ marginTop: "6rem" }}>
        <div className="value-left-section">
          <div className="value-heading">
            <h1>Our Values</h1>
            <lord-icon
              src="https://cdn.lordicon.com/okdadkfx.json"
              trigger="hover"
              style={{ width: "3rem", height: "3rem" }}
            ></lord-icon>
          </div>
          <div className="value-img-div">
            <img src="/HomeImg_4.png" className="value-img" />
          </div>
        </div>
        <div className="value-content">
          <div className="value-content-1">
            <div className="value-subheading">
              <lord-icon
                src="https://cdn.lordicon.com/fqhmyrgj.json"
                trigger="hover"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
              <h1>Accessibility</h1>
            </div>
            <p>
              We ensure easy access to resources for all because to give
              Sanidhya is our motto.
            </p>
            <span className="value-bar"></span>
          </div>
          <div className="value-content-2">
            <div className="value-subheading">
              <lord-icon
                src="https://cdn.lordicon.com/kiynvdns.json"
                trigger="hover"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
              <h1>Support</h1>
            </div>
            <p>
              Sanidhya tries to offer strong support and partnerships to
              individuals as they also have right to grow.
            </p>
          </div>
          <span className="value-bar"></span>
          <div className="value-content-3">
            <div className="value-subheading">
              <lord-icon
                src="https://cdn.lordicon.com/ohfmmfhn.json"
                trigger="hover"
                style={{ width: "60px", height: "60px" }}
              ></lord-icon>
              <h1>Compassion</h1>
            </div>
            <p>
              At Sanidhya we act with empathy and care in all our interactions
              and keep individuals trust alive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueSection;
