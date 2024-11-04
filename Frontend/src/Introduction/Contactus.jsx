import React, { useState } from "react";
import "./Contactus.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/sanidhya/contactus",
        formData
      );

      if (response.status === 200) {
        toast.success(
          "Thank you for your interest,our team will soon respond to you.",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit request, please try later.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="sanidhya-contact-container">
      <h2 className="sanidhya-contact-heading">Get in Touch with Us</h2>
      <form className="sanidhya-contact-form" onSubmit={handleSubmit}>
        <div className="sanidhya-contact-form-group">
          <label htmlFor="name" className="sanidhya-contact-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="sanidhya-contact-input"
            required
            onChange={handleChange}
          />
        </div>
        <div className="sanidhya-contact-form-group">
          <label htmlFor="email" className="sanidhya-contact-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="sanidhya-contact-input"
            required
            onChange={handleChange}
          />
        </div>
        <div className="sanidhya-contact-form-group">
          <label htmlFor="subject" className="sanidhya-contact-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="sanidhya-contact-input"
            required
            onChange={handleChange}
          />
        </div>
        <div className="sanidhya-contact-form-group">
          <label htmlFor="message" className="sanidhya-contact-label">
            Message
          </label>
          <textarea
            id="message"
            className="sanidhya-contact-textarea"
            required
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="sanidhya-contact-button">
          Send Message
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
