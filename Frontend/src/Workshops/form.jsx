import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import "./form.css";

const form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistered(true);

    try {
      // Call the backend API to send the email
      const response = await axios.post(
        `${import.meta.env.VITE_EMAIL_SERVER_URL}/sanidhya/workshop/registration`,
        {
          name,
          email,
        }
      );

      if (response.status === 200) {
        setName("");
        setEmail("");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else {
        console.error("Error during registration:", error.message);
      }
    }
  };

  const handleDialogClose = () => {
    setIsRegistered(false);
    setName("");
    setEmail("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          maxWidth: "600px",
          width: "90%",
          height: "400px",
          margin: "0 auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Register for the Workshop
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <label htmlFor="admin-name">Admin name / Org name</label>
          <input
            type="text"
            id="admin-name"
            placeholder="Ravi Patel"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />

          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            placeholder="xyz@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Register
          </Button>
        </form>

        <Dialog open={isRegistered} onClose={handleDialogClose}>
          <DialogTitle>Registration Successful!</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Hi {name}, you have successfully registered for the workshop.A
              confirmation message will be sent to {email}. for registering with
              Sanidhya!
            </Typography>
            <Button
              onClick={handleDialogClose}
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default form;
