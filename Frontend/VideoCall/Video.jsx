import React, { useContext, useState } from "react";
import { SocketContext } from "../src/Videoconference.jsx";
import {
  faVideo,
  faMicrophone,
  faVideoSlash,
  faMicrophoneSlash,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, styled, Tooltip } from "@mui/material";
import "./Video.css";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
))(({ theme }) => ({
  backgroundColor: "#6CBEC7",
  color: "white",
  fontSize: "1.2rem",
  "& .MuiTooltip-arrow": {
    color: "black",
  },
}));

const Video = () => {
  const [toggleVideo, setToggleVideo] = useState(true);
  const [toggleAudio, setToggleAudio] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const {
    myVideo,
    peerVideo,
    callerName,
    expertName,
    toggleScreenShare,
    isScreenSharing,
    callInstance,
  } = useContext(SocketContext);

  //Toggling Video
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

  //Toggling Audio
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
          <p>{expertName || "My Name"}</p>
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
          />
        </div>
        &nbsp;&nbsp; &nbsp; &nbsp;
        <div className="peer-video">
          <p>{callerName || "Org Name"}</p>
          <video
            playsInline
            autoPlay
            ref={(el) => {
              peerVideo.current = el;
              if (el) {
                console.log("UserVideo element assigned:", el);
              }
            }}
          />
        </div>
      </div>
      {callInstance && (
        <div className="video-icons-div">
          <div className="video-icons">
            <FontAwesomeIcon
              icon={toggleVideo ? faVideo : faVideoSlash}
              size="2xl"
              style={{ color: "#333", cursor: "pointer" }}
              onClick={handleToggleVideo}
            />
            <FontAwesomeIcon
              icon={toggleAudio ? faMicrophone : faMicrophoneSlash}
              size="2xl"
              style={{ color: "#333", cursor: "pointer" }}
              onClick={handleToggleAudio}
            />
            {isScreenSharing ? (
              <CustomTooltip
                disableFocusListener
                disableTouchListener
                title="Stop sharing"
              >
                <FontAwesomeIcon
                  icon={faRectangleXmark}
                  size="2xl"
                  style={{ color: "#333", cursor: "pointer" }}
                  onClick={toggleScreenShare}
                />
              </CustomTooltip>
            ) : (
              <CustomTooltip
                disableFocusListener
                disableTouchListener
                title="Share your screen"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/boyoxams.json"
                  trigger="morph"
                  state="morph-share"
                  style={{ cursor: "pointer" }}
                  onClick={toggleScreenShare}
                ></lord-icon>
              </CustomTooltip>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
