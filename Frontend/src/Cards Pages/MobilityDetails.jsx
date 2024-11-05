import React, { useState } from "react";
import "./MobilityDetails.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MobilityDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  //Tracking changes if input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //Submitting form data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_EMAIL_SERVER_URL}/sanidhya/contactus`,
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
    <div className="mobility-container">
      <h1 className="mobility-heading">Mobility Services</h1>
      <p className="mobility-intro">
        Our mobility services are tailored to assist individuals in enhancing
        their mobility and independence. We provide personalized solutions to
        meet your unique needs.
      </p>

      <h2 className="mobility-subheading">Services We Offer</h2>
      <ul className="mobility-services-list">
        <li>Mobility Assessments</li>
        <li>Wheelchair Fitting and Training</li>
        <li>Physical Therapy for Mobility Improvement</li>
        <li>Home Modification Assessments</li>
        <li>Adaptive Equipment Training</li>
      </ul>

      <h2 className="mobility-subheading">Success Stories</h2>
      <div className="mobility-success-stories">
        <div className="mobility-story">
          <h3>Mark's Progress</h3>
          <p>
            With our support, Mark improved his mobility skills, allowing him to
            navigate his home with confidence.
          </p>
        </div>
        <div className="mobility-story">
          <h3>Alice's Journey</h3>
          <p>
            Alice learned to use her new mobility aid effectively, greatly
            enhancing her independence and quality of life.
          </p>
        </div>
      </div>

      <h2 className="mobility-subheading">Get in Touch For Our Services</h2>
      <form className="mobility-contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          name="name"
          required
          value={formData.name}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
          name="email"
          required
          value={formData.email}
        />

        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
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
          onChange={handleChange}
          value={formData.message}
        ></textarea>

        <button type="submit" className="mobility-submit-button">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
