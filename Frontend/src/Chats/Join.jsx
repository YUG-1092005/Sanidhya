import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Join.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Join = ({ onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  //Closing chat
  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  //Creating room here
  const createRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/chat/create-room",
        { roomId: room },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response Data:", response.data);

      if (response.status === 201) {
        navigate(`/sanidhya/chat?name=${name}&room=${room}`);
        toast.success(`Welcome to room ${room}`);
      } else if (response.status === 200) {
        navigate(`/sanidhya/chat?name=${name}&room=${room}`);
        toast.success(`Welcome back to room ${room}`);
      } else {
        toast.error("Failed to enter in to room.Please try again or later.");
      }
    } catch (error) {
      console.log("Error creating room:", error);
      toast.error("Failed to create room. Please try again.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && room) {
      createRoom();
    } else {
      setError("Name and room number are required.");
    }
  };

  return (
    <div className={`joinOuterContainer ${isClosing ? "hidden" : ""}`}>
      <div className="joinInnerContainer">
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: "#ffffff", padding: "2px", cursor: "pointer" }}
          size="xl"
          onClick={handleClose}
        />
        <h1 className="joinHeading">Join</h1>
        <div className="line"></div>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <div>
          <input
            type="text"
            placeholder="Your Name"
            className="joinInput"
            value={name}
            onChange={handleNameChange}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
          <input
            type="text"
            placeholder="Org. Room no"
            className="joinInput"
            value={room}
            onChange={handleRoomChange}
          />
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button className="joinButton" onClick={handleSubmit}>
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Join;
