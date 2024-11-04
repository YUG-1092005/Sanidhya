import { React, useState, useEffect } from "react";
import "./Experts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CallReqForm from "./CallReqForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip, styled } from "@mui/material";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
))(({ theme }) => ({
  backgroundColor: "#6CBEC7",
  color: "white",
  fontSize: "1.2rem",
  "& .MuiTooltip-arrow": {
    color: "black",
  },
}));

const Experts = () => {
  const [callForm, setCallForm] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState(null);
  const [orgId, setOrgId] = useState(null);
  const [experts, setExperts] = useState([]);
  const navigate = useNavigate();

  //Fetching experts from db
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/expert/list");
        setExperts(response.data.data);
      } catch (error) {
        console.log("Error fetching experts:", error);
      }
    };
    fetchExperts();
  }, []);

  // Fetch orgId from backend
  useEffect(() => {
    const fetchOrgId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/call/organization/orgId",
          {
            withCredentials: true,
          }
        );
        setOrgId(response.data.orgId);
        console.log("org ID", response.data.orgId);
      } catch (error) {
        console.error("Error fetching orgId:", error);
      }
    };

    fetchOrgId();
  }, []);

  const handleToggle = (id) => {
    setSelectedExpertId(id);
    setCallForm(!callForm);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          padding: "2rem 0 2rem 2rem",
        }}
        className="expert-container"
      >
        {experts && experts.length > 0 ? (
          experts.map((expert) => (
            <div className="card-container">
              <div className="card" key={expert._id}>
                <div className="card-content">
                  <div className="card-image">
                    <img
                      src={expert.image}
                      alt={`Image of ${expert.name}`}
                      loading="lazy"
                    />
                  </div>

                  <div className="social-media">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      size="xl"
                      className="icon"
                    />
                    <FontAwesomeIcon
                      icon={faSquareInstagram}
                      size="xl"
                      className="icon"
                    />
                    <CustomTooltip
                      disableFocusListener
                      disableTouchListener
                      title="Request a call with the expert"
                    >
                      <FontAwesomeIcon
                        icon={faHandshake}
                        className="icon handshake-icon"
                        size="xl"
                        onClick={() => handleToggle(expert.id)}
                      />
                    </CustomTooltip>
                  </div>

                  <div className="name-profession">
                    <span className="name">{expert.name}</span>
                    <span className="profession">{expert.profession}</span>
                  </div>

                  <div className="expert-btn">
                    <button
                      className="about-me"
                      onClick={() => navigate(`/expert/${expert._id}`)}
                    >
                      About me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No experts available</p>
        )}
        {callForm && orgId && (
          <CallReqForm
            handleToggle={handleToggle}
            id={selectedExpertId}
            orgId={orgId}
          />
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Experts;
