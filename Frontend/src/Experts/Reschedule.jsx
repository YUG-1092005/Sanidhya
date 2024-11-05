import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Snackbar, Alert } from "@mui/material";
import "./Reschedule.css";

const RescheduleForm = ({ handleClose, orgID, requestId, id }) => {
  const [reschedule, setReschedule] = useState({
    expertName: "",
    date: "",
    day: "",
    time: "",
    message: "",
  });
  const [snackOpen, setSnackOpen] = useState(false);

  const handleFormData = (e) => {
    setReschedule({ ...reschedule, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const rescheduleData = {
        ...reschedule,
        orgId: orgID._id,
        expertId: id,
      };

      console.log(rescheduleData);

      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/call/rescheduling-request/${requestId}`,
        rescheduleData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSnackOpen(true);

      if (!response) {
        throw new Error("Failed to submit the reschedule request");
      }

      setReschedule({
        expertName: "",
        date: "",
        day: "",
        time: "",
        message: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error submitting the reschedule request:", error);
      toast.error("There was an error submitting the form. Please try again.");
    }
  };

  // Function to handle Snackbar close event
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="req-cancel-icon">
          <FontAwesomeIcon
            icon={faXmark}
            style={{ color: "#333", padding: "2px", cursor: "pointer" }}
            size="xl"
            onClick={handleClose}
          />
        </div>
        <h2 className="req-title">Reschedule Form</h2>
        <form className="req-form" onSubmit={handleFormSubmit}>
          <label>Expert Name</label>
          <input
            type="text"
            name="expertName"
            placeholder="Name"
            onChange={handleFormData}
            value={reschedule.expertName}
            required
          />

          <label>Message</label>
          <input
            type="text"
            name="message"
            placeholder="Message"
            onChange={handleFormData}
            value={reschedule.message}
            required
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            onChange={handleFormData}
            value={reschedule.date}
            required
          />

          <label>Day</label>
          <input
            type="text"
            name="day"
            placeholder="Day"
            onChange={handleFormData}
            value={reschedule.day}
            required
          />

          <label>Time</label>
          <input
            type="time"
            name="time"
            onChange={handleFormData}
            value={reschedule.time}
            required
          />
          <button type="submit" className="req-submit-btn">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleSnackClose}
          severity="success"
          variant="filled"
          sx={{
            width: "400px",
            maxWidth: "90%",
            padding: "16px",
            fontSize: "1.2rem",
          }}
        >
          Rescheduled request sent!!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RescheduleForm;
