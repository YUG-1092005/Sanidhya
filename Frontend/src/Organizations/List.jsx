import React, { useState, useEffect } from "react";
import "./List.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/list`
        );
        console.log(response.data.data);
        setOrganizations(response.data.data);
      } catch (error) {
        console.log("Error fetching orgs:", error);
      }
    };
    fetchOrgs();
  }, []);

  const handleOrgDetailNavigate = (id) => {
    if (id) {
      navigate(`/organization/${id}`);
    } else {
      toast.error("Organizaion not found");
    }
  };

  return (
    <div
      className="org-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        padding: "2rem 0 2rem 2rem",
      }}
    >
      {notification && <div className="notification">{notification}</div>}

      {organizations.length === 0 ? (
        <p>No organizations found. Please add an organization.</p>
      ) : (
        organizations.map((org) => (
          <div className="org-card-container" key={org.id}>
            <div className="org-card" key={org.id}>
              <div className="org-content">
                <div className="org-image-div">
                  <img
                    src={org.image}
                    alt={`Image of ${org.name}`}
                    loading="lazy"
                    className="org-image"
                  />
                </div>
              </div>
              <div className="org-data">
                <h2 className="org-name">{org.orgName}</h2>
                <span className="org-place">{org.place}</span>
                <p className="org-description">{org.description}</p>
                <button
                  className="view-more-btn"
                  onClick={() => handleOrgDetailNavigate(org._id)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default List;
