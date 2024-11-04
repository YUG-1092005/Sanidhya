import React, { useState, useContext } from "react";
import {
  Typography,
  Paper,
  Button,
  TextField,
  Container,
  Box,
} from "@mui/material";
import "./Orgoptions.css";
import { SocketContext } from "../src/Videoconference.jsx";

const Orgoptions = ({ children }) => {
  const { call, remotePeerId, setRemotePeerId, setMyName, peerVideo } =
    useContext(SocketContext);
  const [orgName, setOrgName] = useState("");
  const [expertName, setExpertName] = useState("");

  //Calling remote user
  const handleJoinClick = () => {
    setMyName(orgName);
    call(remotePeerId, orgName);
  };

  //Hangup call
  const leaveCall = () => {
    window.location.reload();
  };

  return (
    <div>
      <Container
        className="styled-container"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <Paper
          className="styled-paper"
          elevation={10}
          style={{ padding: "1rem", borderRadius: "15px", marginTop: "1rem" }}
        >
          <Typography gutterBottom variant="h6" style={{ textAlign: "center" }}>
            Meeting Details
          </Typography>
          <Box
            component="input"
            type="text"
            placeholder="Org. Name"
            onChange={(e) => setOrgName(e.target.value)}
            value={orgName}
            style={{
              padding: "0.5rem",
              textAlign: "center",
              width: "90%",
              marginTop: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <Box
            component="input"
            type="text"
            placeholder="Your Expert Name"
            onChange={(e) => setExpertName(e.target.value)}
            value={expertName}
            style={{
              padding: "0.5rem",
              textAlign: "center",
              width: "90%",
              marginTop: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <Box
            component="input"
            type="text"
            placeholder="Meeting ID"
            value={remotePeerId}
            onChange={(e) => setRemotePeerId(e.target.value)}
            style={{
              padding: "0.5rem",
              textAlign: "center",
              width: "90%",
              marginTop: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </Paper>
      </Container>
      <div className="join-video-btn-div">
        <Button
          className="join-video-btn"
          variant="contained"
          color="primary"
          onClick={handleJoinClick}
        >
          Join
        </Button>
        <Button
          className="hang-up-btn"
          onClick={leaveCall}
          variant="contained"
          color="primary"
        >
          Hang Up
        </Button>
      </div>

      {children}
    </div>
  );
};

export default Orgoptions;
