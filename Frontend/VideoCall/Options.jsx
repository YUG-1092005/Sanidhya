import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  styled,
  Button,
  TextField,
  Container,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { SocketContext } from "../src/Videoconference";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Options = ({ children }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    expertName,
    setExpertName,
    peer,
    setMeetingId,
    meetingId,
    createNewMeeting,
  } = useContext(SocketContext);

  const [isIdValid, setIsIdValid] = useState(false);

  //Creating new meeting Id
  const handleExpertIdSubmit = async () => {
    try {
      const newMeetingId = createNewMeeting();
      console.log("handleExpertIdSubmit called");

      // Save Expert ID and Name
      const saveResponse = await axios.post(
        "http://localhost:8080/connect/save-expert",
        {
          meetingId: newMeetingId,
          expertId: id,
          expertName,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("POST /connect/save-expert response:", saveResponse.data);

      if (saveResponse.data.success) {
        navigate(`/sanidhya/expert-call/${id}`);
        toast.success("Your ID and Name saved successfully!", {
          autoClose: 2000,
        });
      } else {
        toast.error("Expert ID not found.");
        console.log("POST error data:", saveResponse.data);
      }
    } catch (error) {
      console.error("Error while checking/saving Expert ID:", error);
      toast.error("An error occured.Please try again");
    }
  };

  //For checking expert there or not
  useEffect(() => {
    const checkExpertId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/connect/check-expert/${id}`
        );

        console.log("GET /connect/check-expert response:", response.data);

        if (response.data.exists) {
          setIsIdValid(true);
          setMeetingId(response.data.meetingId);
          console.log("Expert ID exists", response.data.meetingId);
        } else {
          setIsIdValid(false);
        }
      } catch (error) {
        console.error("Error checking Expert ID:", error);
      }
    };
    checkExpertId();
  }, [id]);

  return (
    <div>
      <Container
        className="styled-container"
        style={{ padding: "3rem", textAlign: "center" }}
      >
        <Paper
          className="styled-paper"
          elevation={10}
          style={{ padding: "1rem", borderRadius: "15px" }}
        >
          {" "}
          <Typography gutterBottom variant="h6">
            Meeting Details
          </Typography>
          <Box
            component="input"
            type="text"
            placeholder="Name"
            value={expertName}
            onChange={(e) => setExpertName(e.target.value)}
            style={{
              padding: "0.5rem",
              textAlign: "center",
              width: "90%",
              marginTop: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          {!peer ? (
            isIdValid ? (
              <Typography variant="body1" style={{ marginTop: "15px" }}>
                Meeting ID: <b>{meetingId}</b>
              </Typography>
            ) : (
              <Box
                style={{
                  padding: "0.5rem",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "15px",
                  border: "1px solid #fff",
                  borderRadius: "4px",
                }}
              >
                <Button
                  onClick={handleExpertIdSubmit}
                  variant="contained"
                  color="primary"
                >
                  Set Your ID
                </Button>
              </Box>
            )
          ) : null}
        </Paper>
      </Container>
      {children}
      <ToastContainer />
    </div>
  );
};

export default Options;
