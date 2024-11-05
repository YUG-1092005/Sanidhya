import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Join from "../Chats/Join.jsx";
import { v4 as uuidv4 } from "uuid";
import { Button, Tooltip, styled } from "@mui/material";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./orgToast.css";
import "./Viewmore.css";
import axios from "axios";

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

const Viewmore = () => {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const [notificationsOrg, setNotificationsOrg] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [orgDetails, setOrgDetails] = useState(null);
  const [showOrgNotifications, setShowOrgNotifications] = useState(false);
  const [join, setJoin] = useState(false);
  const [acceptedNotifications, setAcceptedNotifications] = useState(new Set());
  const [newNotification, setNewNotification] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [reschedulingRequests, setReschedulingRequests] = useState([]);
  const [acceptButton, setAcceptButton] = useState({});
  const [loading, setLoading] = useState(true);
  const [orgDetailsFromDb, setOrgDetailsFromDb] = useState(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/list`
        );
        console.log(response.data.data);
        if (response.data.data) {
          setOrgs(response.data.data);
        } else {
          console.error("Failed to fetch orgs:", response.data.data);
        }
      } catch (error) {
        console.log("Error fetching orgs:", error);
      }
    };
    fetchOrgs();
  }, []);

  useEffect(() => {
    const fetchOrgFromBackend = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/org-details/${orgId}`
        );
        const org = response.data;
        setOrgDetails(org || null);
        console.log("ORG", org);

        if (org && currentUser) {
          const orgUserId = org.userId?._id || org.userId;
          console.log("Current User ID:", currentUser._id);
          console.log("Org User ID:", orgUserId);

          const isSameUser = String(currentUser._id) === String(orgUserId);
          console.log("Is Same User:", isSameUser);
          setHasPermission(isSameUser);
        } else {
          setHasPermission(false);
        }
      } catch (err) {
        console.error("Error fetching organization:", err);
        navigate("*");
        setOrgDetails(null);
        setHasPermission(false);
      }
    };

    if (orgId) {
      fetchOrgFromBackend();
    } else {
      console.error("Invalid Organization ID format");
      setOrgDetails(null);
      setHasPermission(false);
    }
  }, [orgId, currentUser]);

  //Use effect for fetching current user
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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/${orgId}/notifications`
        );
        console.log("ID FOR ORG>>>>>", orgId);
        setNotificationsOrg(response.data);
        console.log("Notifications", response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [orgId]);

  useEffect(() => {
    const fetchReschedulingRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/${orgId}/rescheduling-requests`
        );
        setReschedulingRequests(response.data);
      } catch (error) {
        console.error("Error fetching rescheduling requests:", error);
      }
    };
    fetchReschedulingRequests();
  }, [orgId]);

  const notify = () =>
    toast("You accepted reschedule", {
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

  const handleShowOrgNotifications = () => {
    setShowOrgNotifications(!showOrgNotifications);
  };

  const handleOrgEdit = () => {
    navigate(`/organization/${orgId}/edit`, { state: { orgDetails } });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/${orgId}/remove`
      );
      console.log("org data:", response.data);
      if (response.data) {
        navigate("/organization/list");
        toast.success("Organization deleted successfully!", {
          autoClose: 2000,
        });
        console.log("Org id", orgId);
      }
    } catch (error) {
      console.log("Error deleting org:", error);
    }
  };

  const handleRescheduleAccept = async (requestId) => {
    try {
      const reschedulingResponse = await axios.get(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/organization/${orgId}/rescheduling-requests`
      );
      console.log("Original request response:", reschedulingResponse.data);
      const originalRequests = reschedulingResponse.data;
      const originalRequest = originalRequests[0];
      console.log("Original request response:", originalRequest);

      if (!orgId) {
        throw new Error("Organization ID is not defined.");
      }

      await axios.post(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/call/accept-rescheduled-request`,
        {
          expertName: originalRequest.expertName,
          organizationId: orgId,
          expertId: originalRequest.expertId,
          originalRequestId: requestId,
          newDate: originalRequest.date,
          newTime: originalRequest.time,
        }
      );

      setReschedulingRequests((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
      setAcceptButton((prev) => ({ ...prev, [requestId]: true }));
      toast.success("Rescheduled request accepted!");
    } catch (error) {
      console.error("Error accepting rescheduling request:", error);
      toast.error("Failed to accept the rescheduled request.");
    }
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
      {orgDetails && (
        <div className="org-details-container">
          <h1>{orgDetails.name}</h1>
          <img
            src={orgDetails.image}
            alt={`Image of ${orgDetails.name}`}
            loading="lazy"
            className="org-details-image"
          />
          <div className="org-details">
            <div className="details-div">
              <h2>Admin: </h2>
              <p>{orgDetails.adminName}</p>
            </div>
            <div className="details-div">
              <h2>About: </h2>
              <p>{orgDetails.description}</p>
            </div>
            <div className="details-div">
              <h2>Situated at: </h2>
              <p>{orgDetails.place}</p>
            </div>
            {hasPermission && (
              <div className="details-div">
                <h2>RoomNo. : </h2>
                <p> {orgDetails.roomNo}</p>
              </div>
            )}
            <div className="details-div">
              <h2>Org.Email : </h2>
              <p> {orgDetails.email}</p>
            </div>
            {hasPermission && (
              <div className="org-details-buttons">
                <CustomTooltip
                  disableFocusListener
                  disableTouchListener
                  title="Edit your org's info"
                >
                  <button className="edit-btn" onClick={handleOrgEdit}>
                    Edit
                  </button>
                </CustomTooltip>
                <CustomTooltip
                  disableFocusListener
                  disableTouchListener
                  title="Delete your org's info"
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
                        // onClick={handleNotificationClick}
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
                        onClick={handleShowOrgNotifications}
                        style={{ cursor: "pointer" }}
                      ></lord-icon>
                    </CustomTooltip>
                  )}

                  <Link to={`/sanidhya/org-call/${orgId}`}>
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
                      ></lord-icon>
                    </CustomTooltip>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showOrgNotifications && (
        <>
          <div className="notify" style={{ padding: "2rem" }}>
            <h2>Notifications for {orgDetails.orgName}</h2>
          </div>
          {console.log("notifications...", notificationsOrg)}
          <div className="all-notifications">
            {notificationsOrg.length === 0 ? (
              <p>No notifications</p>
            ) : (
              <div className="regular-notifications">
                <h2>Regular Notifications</h2>
                <hr />
                <ul>
                  {notificationsOrg.map((notification, index) => {
                    if (notification.status === "accepted_by_expert") {
                      return (
                        <li
                          key={index}
                          className="notification-container"
                          style={{
                            fontSize: "18px",
                            marginBottom: "15px",
                            padding: "10px",
                          }}
                        >
                          <p>
                            <strong>Admin Name:</strong>{" "}
                            {notification.adminName || "N/A"}
                          </p>
                          <p>
                            <strong>Notification:</strong>{" "}
                            {notification.message || "N/A"}
                          </p>
                          <p>
                            <strong>Room No:</strong>{" "}
                            {notification.roomNo || "N/A"}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {notification.date
                              ? notification.date.slice(0, 10)
                              : "N/A"}
                          </p>
                          <p>
                            <strong>Day:</strong> {notification.day || "N/A"}
                          </p>
                          <p>
                            <strong>Time:</strong> {notification.time || "N/A"}
                          </p>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            {reschedulingRequests.length > 0 && (
              <div className="reschedule-notifications">
                <h2>Rescheduled Notifications</h2>
                <hr />
                <ul>
                  {reschedulingRequests.map((request) => (
                    <li key={uuidv4()}>
                      <p style={{ marginTop: "5px" }}>
                        <strong>Expert Name:</strong>{" "}
                        {request.expertName || "N/A"}
                      </p>
                      <p style={{ marginTop: "5px" }}>
                        <strong>Message:</strong> {request.message || "N/A"}
                      </p>
                      <p style={{ marginTop: "5px" }}>
                        <strong>Rescheduled Date:</strong>{" "}
                        {request.date || "N/A"}
                      </p>
                      <p style={{ marginTop: "5px" }}>
                        <strong>Rescheduled Time:</strong>{" "}
                        {request.time || "N/A"}
                      </p>
                      <p style={{ marginTop: "5px" }}>
                        <strong>Rescheduled day:</strong> {request.day || "N/A"}
                      </p>
                      <button
                        className="accept"
                        variant="contained"
                        disabled={
                          acceptButton[request._id] ||
                          request.status == "accepted"
                        }
                        color="primary"
                        style={{ width: "8%", marginTop: "5px" }}
                        onClick={() =>
                          handleRescheduleAccept(
                            request._id,
                            request.organizationId
                          )
                        }
                      >
                        Accept
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
      {join && <Join onClose={handleJoinSection} />}
      <ToastContainer />
    </div>
  );
};

export default Viewmore;
