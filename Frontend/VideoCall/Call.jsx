import React from "react";
import "./Call.css";
import Video from "./Video.jsx";
import Options from "./Options.jsx";
import Callnotifications from "./Callnotifications";

const Call = () => {
  return (
    <div className="video-call-container">
      <div className="video-call-heading-parent-div">
        <div className="video-call-heading-div">
          <h2 className="video-call-heading">Sanidhya Connect</h2>
        </div>
      </div>
      <br />
      <Video />
      <Options>
        <Callnotifications />
      </Options>
    </div>
  );
};

export default Call;
