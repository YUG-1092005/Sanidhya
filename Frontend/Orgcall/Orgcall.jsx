import React, { useContext } from "react";
import OrgVideo from "./OrgVideo";
import Orgoptions from "./Orgoptions";

const Orgcall = () => {
  return (
    <div className="video-call-container">
      <div className="video-call-heading-parent-div">
        <div className="video-call-heading-div">
          <h2 className="video-call-heading">Sanidhya Connect</h2>
        </div>
      </div>
      <OrgVideo />
      <Orgoptions />
    </div>
  );
};

export default Orgcall;
