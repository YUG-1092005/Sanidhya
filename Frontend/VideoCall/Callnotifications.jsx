import React, { useContext } from "react";
import { SocketContext } from "../src/Videoconference";
import { Button } from "@mui/material";
import "./Callnotify.css";

const Callnotifications = () => {
  const { isReceivingCall, answerCall, callerName } = useContext(SocketContext);

  return (
    <>
      {isReceivingCall && (
        <div className="call-notification-container">
          <h2>{callerName} is calling...</h2>
          <Button
            className="answer-btn"
            onClick={answerCall}
            variant="contained"
            color="primary"
            style={{ width: "20%", marginTop: "5px" }}
          >
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Callnotifications;
