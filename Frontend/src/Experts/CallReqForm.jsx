import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Callreq.css";

const CallReqForm = ({ handleToggle, orgId }) => {
  const [experts, setExperts] = useState([]);
  const [selectedExpertId, setSelectedExpertId] = useState("");
  const [formData, setFormData] = useState({
    adminName: "",
    roomNo: "",
    date: "",
    day: "",
    time: "",
    message: "",
    orgId: orgId || "",
  });

  //Fetching all experts from db
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/expert/list");
        setExperts(response.data.data);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };
    fetchExperts();
  }, []);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...formData,
      expertId: selectedExpertId,
    };

    console.log(requestData);
    try {
      await axios.post(
        "http://localhost:4000/call/submit-call-request",
        requestData
      );
      toast.success("Request sent successfully!");
      handleToggle();
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="call-request-overlay">
      <div className="call-request-form">
        <div className="close-form">
          <span onClick={handleToggle}>&times;</span>
        </div>

        <h2 className="call-req-heading">Request Expert</h2>
        <form onSubmit={handleFormSubmit}>
          <label>Admin Name</label>
          <input
            type="text"
            name="adminName"
            placeholder="Name"
            onChange={handleFormData}
            required
          />

          <label>Room No.</label>
          <input
            type="number"
            name="roomNo"
            min={1000}
            max={9999}
            placeholder="No."
            onChange={handleFormData}
            required
          />

          <label>Date</label>
          <input type="date" name="date" onChange={handleFormData} required />

          <label>Day</label>
          <input
            type="text"
            name="day"
            placeholder="Day"
            onChange={handleFormData}
            required
          />

          <label>Time</label>
          <input type="time" name="time" onChange={handleFormData} required />

          <label>Message</label>
          <input
            type="text"
            name="message"
            placeholder="Message"
            onChange={handleFormData}
            required
          />

          <label>Select Your Expert</label>
          <select
            value={selectedExpertId}
            onChange={(e) => setSelectedExpertId(e.target.value)}
            required
          >
            <option value="">Select Expert</option>
            {Array.isArray(experts) &&
              experts.map((expert) => (
                <option key={expert._id} value={expert._id}>
                  {expert.name}
                </option>
              ))}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CallReqForm;
