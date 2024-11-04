import React from "react";
import "./TrustSection.css";

const TrustSection = () => {
  return (
    <div>
      <div className="trust-section">
        <div className="trust-img-div">
          <img src="/trustimage.PNG" className="trust-img" />
        </div>
        <div className="trust-content">
          <h2>Empowering lives through support.</h2>
          <p>
            Sanidhya connects with organizations, fostering empowerment and
            inclusivity through accessible and supportive services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
