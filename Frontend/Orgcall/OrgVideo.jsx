import React, { useContext, useState } from "react";
import { SocketContext } from "../src/Videoconference.jsx";
import {
  faVideo,
  faMicrophone,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrgVideo = () => {
  const [toggleVideo, setToggleVideo] = useState(true);
  const [toggleAudio, setToggleAudio] = useState(true);

  const { call, myVideo, peerVideo, myName, expertName, callInstance } =
    useContext(SocketContext);

  //Toggling video
  const handleToggleVideo = () => {
    setToggleVideo((prevState) => !prevState);
    if (myVideo.current) {
      myVideo.current.srcObject.getTracks().forEach((track) => {
        if (track.kind === "video") {
          track.enabled = !track.enabled;
        }
      });
    }
  };

  //Toggle audio
  const handleToggleAudio = () => {
    setToggleAudio((prevState) => !prevState);
    if (myVideo.current) {
      myVideo.current.srcObject.getTracks().forEach((track) => {
        if (track.kind === "audio") {
          track.enabled = !track.enabled;
        }
      });
    }
  };

  return (
    <div>
      <div className="video-containers">
        <div className="my-video">
          <p>{myName || "My Name"}</p>
          <video
            playsInline
            autoPlay
            muted
            ref={(el) => {
              myVideo.current = el;
              if (el) {
                console.log("MyVideo element assigned:", el);
              }
            }}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        &nbsp;&nbsp; &nbsp; &nbsp;
        <div className="peer-video">
          {console.log("Rendering user video", peerVideo)}

          <p>{expertName || "Host Video"}</p>
          <video
            playsInline
            autoPlay
            ref={(el) => {
              peerVideo.current = el;
              if (el) {
                console.log("UserVideo element assigned:", el);
              }
            }}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>

      {myName && (
        <div className="video-icons-div">
          <div className="video-icons">
            <FontAwesomeIcon
              icon={toggleVideo ? faVideo : faVideoSlash}
              size="2xl"
              style={{ color: "#333" }}
              onClick={handleToggleVideo} // Toggle video on click
            />
            <FontAwesomeIcon
              icon={toggleAudio ? faMicrophone : faMicrophoneSlash}
              size="2xl"
              style={{ color: "#333" }}
              onClick={handleToggleAudio} // Toggle audio on click
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgVideo;
