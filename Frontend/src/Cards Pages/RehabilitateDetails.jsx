import React, { useState } from "react";
import "./RehabilitateDetails.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RehabilitateDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  //Tracking changes of inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //Submitting form data to server
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
    <div className="rehabilitate-container">
      <h1 className="rehabilitate-heading">Rehabilitation Services</h1>
      <p className="rehabilitate-intro">
        Our rehabilitation services are designed to help individuals regain
        their independence and improve their quality of life. We provide
        tailored programs that address the unique needs of each individual.
      </p>

      <h2 className="rehabilitate-subheading">Our Services</h2>
      <ul className="rehabilitate-services-list">
        <li>Physical Therapy</li>
        <li>Occupational Therapy</li>
        <li>Speech Therapy</li>
        <li>Psychosocial Support</li>
        <li>Assistive Technology Training</li>
      </ul>

      <h2 className="rehabilitate-subheading">Success Stories</h2>
      <div className="rehabilitate-success-stories">
        <div className="rehabilitate-story">
          <h3>John's Journey</h3>
          <p>
            After a serious injury, John was able to regain his mobility and
            return to work with our comprehensive rehabilitation program.
          </p>
        </div>
        <div className="rehabilitate-story">
          <h3>Emily's Triumph</h3>
          <p>
            Through our speech therapy sessions, Emily improved her
            communication skills, enabling her to connect with others more
            effectively.
          </p>
        </div>
      </div>

      <h2 className="rehabilitate-subheading">Contact Us For Services</h2>
      <form className="rehabilitate-contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="rehabilitate-inputs"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="rehabilitate-inputs"
          onChange={handleChange}
          value={formData.email}
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="rehabilitate-inputs"
          required
          onChange={handleChange}
          value={formData.subject}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          className="rehabilitate-inputs"
          onChange={handleChange}
          value={formData.message}
        ></textarea>

        <button type="submit" className="rehabilitate-submit-button">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
