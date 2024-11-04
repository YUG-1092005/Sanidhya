const express = require("express");
const {
  addOrg,
  listOrg,
  removeOrg,
  editOrg,
} = require("../controllers/orgController");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const orgModel = require("../models/orgModel");
const expertModel = require("../models/expertModel");
const Notification = require("../models/notificationModel");
const reschedulingRequest = require("../models/rescheduledModel");
const mongoose = require("mongoose");
const orgRouter = express.Router();

// Middleware to check if the user is authenticated
const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("org token", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.userId = decoded.id;

    // Check if the user is an org admin (optional, based on your needs)
    const org = await orgModel.findOne({ userId: req.userId });
    req.isOrg = !!org;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token or session expired" });
  }
};

// Middleware to check if the user is an expert
const checkIfExpert = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("org token", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.userId = decoded.id;

    const expert = await expertModel.findOne({ userId: req.userId });
    console.log("Check expert", expert);
    if (expert) {
      return res
        .status(403)
        .json({ message: "Experts are not allowed to add organizations." });
    }
    next();
  } catch (error) {
    console.error("Error in checkIfExpert middleware:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Middleware to check if the user is making and duplicate profile
const checkIfMakingDuplicateProfile = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("org token", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.userId = decoded.id;

    const org = await orgModel.findOne({ userId: req.userId });
    console.log("Check org", org);
    if (org) {
      return res
        .status(403)
        .json({ message: "Organization can only be added once." });
    }
    next();
  } catch (error) {
    console.error("Error in checkIfDuplicateError middleware:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Image of org
const upload = multer({ storage: multer.memoryStorage() });

//Route for adding new org
orgRouter.post(
  "/add",
  checkIfMakingDuplicateProfile,
  checkIfExpert,
  authenticateUser,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Image upload failed." });
    }
    addOrg(req, res);
  }
);

//Route of listing all orgs
orgRouter.get("/list", listOrg);

//Route of deleting a org
orgRouter.delete("/:orgId/remove", removeOrg);

//Route of editing a org
orgRouter.put("/:orgId/edit", upload.single("image"), editOrg);

//Backend only route for authenticating user
orgRouter.get("/check-auth", authenticateUser, (req, res) => {
  res.json({ authenticated: true });
});

//Backend only route for not granting permisssion for expert to add org
orgRouter.get("/check-expert", checkIfExpert, (req, res) => {
  res.json({ authenticated: true });
});

//Backend only route for not granting permisssion for org to add org again
orgRouter.get("/check-org-there", checkIfMakingDuplicateProfile, (req, res) => {
  res.json({ authenticated: true });
});

//Notifications for org
orgRouter.get("/:orgId/notifications", async (req, res) => {
  const { orgId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }
  try {
    const notifications = await Notification.find({ orgId });

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for this organization." });
    }

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notifications." });
  }
});

//Rescheduling requests
orgRouter.get("/:orgId/rescheduling-requests", async (req, res) => {
  const { orgId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }
  const requests = await reschedulingRequest.find({ orgId });
  res.json(requests);
});

//Fetching org details
orgRouter.get("/org-details/:orgId", async (req, res) => {
  const { orgId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }
  try {
    const organization = await orgModel.findById(orgId);
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    console.log(organization);

    res.json(organization);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = orgRouter;
