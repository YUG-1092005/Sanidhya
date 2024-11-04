const express = require("express");
const callController = require("../controllers/callController");
const jwt = require("jsonwebtoken");
const orgModel = require("../models/orgModel");
const CallRequest = require("../models/callReqModel");
const Notification = require("../models/notificationModel");
const rescheduleRequest = require("../models/rescheduledModel");
const acceptedRescheduledRequest = require("../models/accpetedrRescheduleModel");

const callRouter = express.Router();

//Authenticationg user  of org
const authenticateUserWithOrgId = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.userId = decoded.id;

    const org = await orgModel.findOne({ userId: req.userId });
    console.log("org for call", org);
    if (org) {
      req.orgId = org._id;
      next();
    } else {
      return res.status(404).json({ message: "Organization not found." });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ message: "Invalid token or session expired" });
  }
};

//Submitting the call request 
callRouter.post("/submit-call-request", async (req, res) => {
  const { adminName, roomNo, date, day, time, orgId, expertId, message } =
    req.body;
  console.log("Request body:", req.body);
  try {
    const organization = await orgModel.findOne({ _id: orgId });
    console.log("organization found", organization);

    if (!organization) {
      return res
        .status(404)
        .json({ message: "Organization not found for the given userId." });
    }

    console.log("submitting req", orgId);

    const newRequest = new CallRequest({
      adminName,
      roomNo,
      date,
      message,
      day,
      time,
      orgId,
      expertId,
    });

    await newRequest.save();

    const notification = new Notification({
      expertId,
      orgId,
      adminName,
      roomNo,
      date,
      time,
      day,
      message,
      requestId: newRequest._id,
    });

    await notification.save();

    res
      .status(201)
      .json({ message: "Call request and notification created successfully." });
  } catch (error) {
    console.error("Error saving request or notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Get request for org call finding
callRouter.get(
  "/organization/orgId",
  authenticateUserWithOrgId,
  async (req, res) => {
    try {
      if (req.orgId) {
        res.json({ orgId: req.orgId });
      } else {
        res.status(404).json({ message: "Organization ID not found." });
      }
    } catch (error) {
      console.error("Error fetching organization ID:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

//Handling call
callRouter.post("/accept-request/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const { expertId } = req.body;

    console.log("Call Request ID", requestId);
    console.log("Expert ID", expertId);

    const callReq = await CallRequest.findById(requestId);

    if (!callReq) {
      return res.status(404).json({ error: "Call request not found." });
    }

    const updatedCallReq = await CallRequest.updateOne(
      {
        _id: requestId,
      },
      {
        $set: { status: "accepted" },
      }
    );

    if (updatedCallReq.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "No matching callReq found to update." });
    }

    const updateResult = await Notification.findOneAndUpdate(
      { orgId: callReq.orgId, requestId: callReq._id },
      {
        $set: {
          status: "accepted_by_expert",
          message: `Your call request has been accepted by the expert.`,
          adminName: callReq.adminName,
          roomNo: callReq.roomNo,
          date: callReq.date,
          day: callReq.day,
          time: callReq.time,
        },
      },
      { new: true }
    );
    if (updateResult.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "No matching notification found to update." });
    }

    res
      .status(200)
      .json({ message: "Request accepted and notification status updated." });
  } catch (error) {
    console.error("Error updating notification status:", error);
    res.status(500).json({ error: "Failed to update notification status." });
  }
});

//Rescheduling requests from expert
callRouter.post("/rescheduling-request/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    const { expertName, date, day, time, orgId, message, expertId } = req.body;

    if (
      !requestId ||
      !expertName ||
      !date ||
      !day ||
      !time ||
      !orgId ||
      !message
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find the call request
    const callReq = await CallRequest.findById(requestId);
    if (!callReq) {
      return res.status(404).json({ error: "Call request not found." });
    }

    // Update the call request with the new date and time
    const updatedCallReq = await CallRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: "accepted" } },
      { new: true }
    );

    if (!updatedCallReq) {
      return res.status(404).json({ error: "Failed to update call request." });
    }

    // Find the related notification
    const notification = await Notification.findOne({
      orgId: callReq.orgId,
      requestId: callReq._id,
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found." });
    }

    // Update notification status to include reschedule message
    const updatedNotification = await Notification.findByIdAndUpdate(
      notification._id,
      {
        $set: {
          status: "rescheduled",
          message: `Your call request has been rescheduled to ${date} at ${time}.`,
          adminName: callReq.adminName,
          roomNo: callReq.roomNo,
          date: date,
          day: day,
          time: time,
        },
      },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Failed to update notification." });
    }

    // Create a new RescheduleRequest entry
    const reschedule = new rescheduleRequest({
      expertName: expertName,
      date: date,
      day: day,
      time: time,
      message: message,
      orgId: orgId,
      expertId: expertId,
    });

    // Save the rescheduled request to the database
    await reschedule.save();

    // Send a single response after all operations are successful
    res
      .status(200)
      .json({ message: "Request rescheduled successfully.", reschedule });
  } catch (error) {
    console.error("Error rescheduling request:", error);
    res.status(500).json({ error: "Failed to reschedule request." });
  }
});

//Accepting the rescheduling requests
callRouter.post("/accept-rescheduled-request", async (req, res) => {
  const {
    expertName,
    organizationId,
    originalRequestId,
    newDate,
    newTime,
    expertId,
  } = req.body;

  console.log("EXPERT Name: ", expertName);
  console.log("EXPERT ID: ", expertId);
  console.log("ORG ID: ", organizationId);
  console.log("ORIGINAL REQ ID: ", originalRequestId);
  console.log("NEW DATE: ", newDate);
  console.log("NEW TIME: ", newTime);

  try {
    const acceptedRequest = new acceptedRescheduledRequest({
      expertName,
      expertId,
      organizationId,
      originalRequestId,
      newDate,
      newTime,
    });

    await acceptedRequest.save();

    await rescheduleRequest.findByIdAndUpdate(originalRequestId, {
      status: "accepted",
    });

    res.status(201).json(acceptedRequest);
  } catch (error) {
    console.error("Error accepting rescheduled request:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = callRouter;
