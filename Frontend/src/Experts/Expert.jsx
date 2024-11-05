import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RescheduleForm from "./Reschedule.jsx";
import {
  Button,
  styled,
  Tooltip,
  Snackbar,
  Alert,
  Rating,
  Typography,
} from "@mui/material";
import "./Expert.css";
import Join from "../Chats/Join.jsx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./expertToast.css";
import axios from "axios";
import RateExpert from "./RateExpert.jsx";

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

const Expert = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experts, setExperts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [expertDetails, setExpertDetails] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [join, setJoin] = useState(false);
  const [rescheduledNotifications, setRescheduledNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);
  const [prevNotifications, setPrevNotifications] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [isAcceptButtonDisabled, setIsAcceptButtonDisabled] = useState({});
  const [isrescheduleButtonDisabled, setIsRescheduleButtonDisabled] = useState(
    {}
  );

  //Fetching experts
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_SERVER_URL}/expert/list`);
        if (response.data.success) {
          setExperts(response.data.data);
        } else {
          console.error("Failed to fetch experts:", response.data.message);
        }
      } catch (error) {
        console.log("Error fetching experts:", error);
      }
    };
    fetchExperts();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_SERVER_URL}/user/verify`, {
          withCredentials: true,
        });
        if (response.data.success) {
          console.log(response.data);
          setCurrentUser(response.data.user);
          console.log("curr user", response.data.user);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null);
      }
    };
    fetchCurrentUser();
  }, []);

  //Fetch details
  useEffect(() => {
    const fetchExpertFromBackend = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/expert/expert-details/${id}`
        );
        const expert = response.data;
        setExpertDetails(expert || null);
        console.log("Expert", expert);

        if (expert && currentUser) {
          const expertUserId = expert.userId || expert.userId?._id;

          console.log("Current User ID:", currentUser._id);
          console.log("Expert User ID:", expertUserId);

          const isSameUser = String(currentUser._id) === String(expertUserId);
          console.log("Is Same User:", isSameUser);
          setHasPermission(isSameUser);
        } else {
          setHasPermission(false);
        }
      } catch (err) {
        console.error("Error fetching Expert:", err);
        navigate("*");
        setExpertDetails(null);
        setHasPermission(false);
      }
    };

    if (id) {
      fetchExpertFromBackend();
    } else {
      console.error("Invalid Expert ID format");
      setExpertDetails(null);
      setHasPermission(false);
    }
  }, [id, currentUser]);

  const notify = () =>
    toast("You accepted call request", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: "Toastify__toast--custom",
    });

  const handleJoinSection = () => {
    setJoin(!join);
  };

  //Notification for experts
  useEffect(() => {
    const getNotificationForExpert = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/expert/${id}/notifications`
        );
        setNotifications(response.data.notifications);
        console.log("notifications", response.data.notifications);
        if (
          response.data.notifications.length > 0 &&
          response.data.notifications.status == "pending"
        ) {
          toast(
            `You have 
            new notification(s)`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            }
          );
          setNewNotification(true);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotificationForExpert();
  }, [id]);

  //Fetching rescheduling requests
  useEffect(() => {
    const fetchReschedulingRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/expert/${id}/rescheduling-requests`
        );
        setRescheduledNotifications(response.data);
        console.log("RESCHEDULED:", response.data);
      } catch (error) {
        console.error("Error fetching rescheduling requests:", error);
      }
    };
    fetchReschedulingRequests();
  }, [id]);

  const handleShowNotifications = (notification) => {
    console.log("Notification clicked:", notification);
    setNewNotification(false);
    setShowNotifications(!showNotifications);
  };

  const handleFormClose = () => {
    setShowRescheduleForm(false);
    setSelectedNotificationId(null);
    setIsRescheduleButtonDisabled((prev) => ({
      ...prev,
      [selectedNotificationId]: true,
    }));
    setIsAcceptButtonDisabled((prev) => ({
      ...prev,
      [selectedNotificationId]: true,
    }));
  };

  const handleEditNavigation = () => {
    navigate(`/expert/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/expert/${id}/remove`
      );
      console.log("Expert deleted:", response.data);
      if (response.data) {
        navigate("/expert/list");
        toast.success("Organization deleted successfully!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting expert:", error);
    }
  };

  //Accepting call requests here
  const handleAcceptRequest = async (requestId, id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/call/accept-request/${requestId}`,
        { expertId: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsAcceptButtonDisabled((prev) => ({ ...prev, [requestId]: true }));
      setIsRescheduleButtonDisabled((prev) => ({ ...prev, [requestId]: true }));
      setSnackOpen(true);
    } catch (error) {
      setIsAcceptButtonDisabled((prev) => ({ ...prev, [requestId]: false }));
      setIsRescheduleButtonDisabled((prev) => ({
        ...prev,
        [requestId]: false,
      }));
      console.log("Error accepting request:", error);
      console.log("Failed to accept request");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  //Handling reschedule
  const handleReschedule = (notification) => {
    setSelectedNotificationId(notification._id);
    setIsRescheduleButtonDisabled((prev) => ({
      ...prev,
      [notification._id]: false,
    }));
    setIsAcceptButtonDisabled((prev) => ({
      ...prev,
      [notification._id]: false,
    }));
    setShowRescheduleForm(true);
  };

  return (
    <div
      style={{
        margin: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {expertDetails && (
        <div className="expert-details-container">
          <h1>{expertDetails.name}</h1>
          <img
            src={expertDetails.image}
            alt={`Image of ${expertDetails.name}`}
            loading="lazy"
            className="expert-details-image"
          />
          <div className="expert-details">
            <div className="details-div">
              <h2>Profession:</h2>
              <p>{expertDetails.profession}</p>
            </div>
            <div className="details-div">
              <h2>About: </h2>
              <p>{expertDetails.description}</p>
            </div>
            <div className="details-div">
              <h2>Working In: </h2>
              <p>{expertDetails.workingIn}</p>
            </div>
            <div className="details-div">
              <h2>Expertise: </h2>
              <p> {expertDetails.expertise}</p>
            </div>
            <div className="details-div">
              <h2>Practising: </h2>
              <p> {expertDetails.experience} yrs</p>
            </div>
            <div className="details-div">
              <h2>Email: </h2>
              <p> {expertDetails.email}</p>
            </div>
            <div className="details-div">
              {expertDetails.rating ? (
                <Rating value={expertDetails.rating} readOnly precision={0.5} />
              ) : (
                <Rating
                  value={expertDetails.rating}
                  readOnly
                  precision={0.5}
                  style={{ display: "none" }}
                />
              )}
            </div>
          </div>
          {hasPermission && (
            <div className="expert-details-buttons">
              <CustomTooltip
                disableFocusListener
                disableTouchListener
                title="Edit your profile"
              >
                <button className="edit-btn" onClick={handleEditNavigation}>
                  Edit
                </button>
              </CustomTooltip>
              <CustomTooltip
                disableFocusListener
                disableTouchListener
                title="Delete your profile"
              >
                <button className="edit-btn" onClick={handleDelete}>
                  Delete
                </button>
              </CustomTooltip>
              <div className="icon-row">
                <CustomTooltip
                  disableFocusListener
                  disableTouchListener
                  title="Join chat"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/ayhtotha.json"
                    trigger="hover"
                    colors="primary:#0d2337"
                    className="details-options"
                    onClick={handleJoinSection}
                    style={{ cursor: "pointer" }}
                  ></lord-icon>
                </CustomTooltip>
                {newNotification ? (
                  <CustomTooltip
                    disableFocusListener
                    disableTouchListener
                    title="New notifications"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/rnqhxxtn.json"
                      trigger="hover"
                      colors="primary:#0d2337"
                      className="details-options"
                      onClick={handleShowNotifications}
                      style={{ cursor: "pointer" }}
                    ></lord-icon>
                  </CustomTooltip>
                ) : (
                  <CustomTooltip
                    disableFocusListener
                    disableTouchListener
                    title="Notifications"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/lznlxwtc.json"
                      trigger="hover"
                      colors="primary:#0d2337"
                      className="details-options"
                      onClick={handleShowNotifications}
                      style={{ cursor: "pointer" }}
                    ></lord-icon>
                  </CustomTooltip>
                )}
                <Link to={`/sanidhya/expert-call/${id}`}>
                  <CustomTooltip
                    disableFocusListener
                    disableTouchListener
                    title="Video call"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/srsgifqc.json"
                      trigger="hover"
                      colors="primary:#0d2337"
                      className="details-options"
                      style={{ cursor: "pointer" }}
                    ></lord-icon>
                  </CustomTooltip>
                </Link>
              </div>
            </div>
          )}
          <div className="ratings-section">
            {currentUser ? (
              <>
                <RateExpert
                  id={expertDetails._id}
                  expertName={expertDetails.name}
                  userId={currentUser._id}
                  userName={currentUser.name}
                />
              </>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontStyle: "italic",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                Log in to rate me...
              </Typography>
            )}
          </div>
        </div>
      )}

      {showNotifications && (
        <>
          <div className="notify" style={{ margin: "2rem" }}>
            <h2>Notifications for expert {expertDetails.name}</h2>
          </div>
          <div className="all-notifications">
            {notifications.length === 0 ? (
              <p style={{ color: "#333" }}>No notifications</p>
            ) : (
              <div className="regular-notifications">
                <h2>Call Request Notifications</h2>
                <hr />

                <ul>
                  {notifications.map((notification, index) => (
                    <li key={index}>
                      <>
                        <div style={{ padding: "2rem", fontSize: "18px" }}>
                          <h3>Call Request</h3>
                          <p style={{ marginTop: "5px" }}>
                            <strong>Admin Name:</strong>{" "}
                            {notification.adminName || "N/A"}
                          </p>
                          <p style={{ marginTop: "5px" }}>
                            <strong>Room No:</strong>{" "}
                            {notification.roomNo || "N/A"}
                          </p>
                          <p style={{ marginTop: "5px" }}>
                            <strong>Message:</strong>{" "}
                            {notification.message || "N/A"}
                          </p>
                          <p style={{ marginTop: "5px" }}>
                            <strong>Date:</strong>{" "}
                            {notification.date.slice(0, 10) || "N/A"}
                          </p>
                          <p style={{ marginTop: "5px" }}>
                            <strong>Day:</strong> {notification.day || "N/A"}
                          </p>
                          <p style={{ marginTop: "5px" }}>
                            <strong>Time of meeting:</strong>{" "}
                            {notification.time || "N/A"}
                          </p>
                          <div className="accept-reschedule">
                            <button
                              className="accept"
                              variant="contained"
                              disabled={
                                isAcceptButtonDisabled[notification._id] ||
                                notification.status !== "pending"
                              }
                              onClick={() =>
                                handleAcceptRequest(
                                  notification._id,
                                  notification.expertId
                                )
                              }
                              style={{ width: "30%", marginTop: "8px" }}
                            >
                              Accept
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                              className="reschedule"
                              variant="contained"
                              color="primary"
                              style={{ width: "50%", marginTop: "8px" }}
                              onClick={() => handleReschedule(notification)}
                              disabled={
                                isrescheduleButtonDisabled[notification._id] ||
                                notification.status === "accepted"
                              }
                            >
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </>

                      {showRescheduleForm &&
                        selectedNotificationId === notification._id && (
                          <div className="modal-overlay">
                            <RescheduleForm
                              handleClose={handleFormClose}
                              orgID={notification.orgId}
                              requestId={notification._id}
                              id={id}
                            />
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {rescheduledNotifications.length > 0 && (
              <div className="reschedule-notifications">
                <h2>Rescheduled Notifications</h2>
                <hr />

                <ul>
                  {rescheduledNotifications.map(
                    (reschedulingRequest, index) => (
                      <li key={index}>
                        <p style={{ marginTop: "5px" }}>
                          <strong>Expert:</strong>{" "}
                          {reschedulingRequest.expertName || "N/A"}
                        </p>
                        <p style={{ marginTop: "5px" }}>
                          <strong>New Date:</strong>{" "}
                          {reschedulingRequest.newDate.slice(0, 10) || "N/A"}
                        </p>
                        <p style={{ marginTop: "5px" }}>
                          <strong>New Time:</strong>{" "}
                          {reschedulingRequest.newTime || "N/A"}
                        </p>
                        <p style={{ marginTop: "5px" }}>
                          <strong>Message:</strong>{" "}
                          {reschedulingRequest.message || "N/A"}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
      {join && <Join onClose={handleJoinSection} />}
      <ToastContainer />
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: "400px",
            maxWidth: "90%",
            padding: "16px",
            fontSize: "1.2rem",
          }}
        >
          You accepted the request
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Expert;
