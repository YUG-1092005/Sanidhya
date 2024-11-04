const express = require("express");
const {
  addExpert,
  listExpert,
  removeExpert,
  editExpert,
} = require("../controllers/expertController");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const expertModel = require("../models/expertModel");
const orgModel = require("../models/orgModel");
const callReqModel = require("../models/callReqModel");
const ratingModel = require("../models/ratingModel");
const acceptedRescheduledRequest = require("../models/accpetedrRescheduleModel");

const expertRouter = express.Router();

// Middleware to check if the user is authenticated
const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.userId = decoded.id;

    const expert = await expertModel.findOne({ userId: req.userId });
    req.isExpert = !!expert;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token or session expired" });
  }
};

// Middleware to check if the user is an expert
const checkIfOrgUser = async (req, res, next) => {
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
        .json({ message: "Orgs are not allowed to be expert." });
    }
    next();
  } catch (error) {
    console.error("Error in checkIfOrgUser middleware:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Checking expert making profile again
const checkIfMakingDuplicateProfile = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Expert token", token);

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
        .json({ message: "Expert can only be added once." });
    }
    next();
  } catch (error) {
    console.error("Error in checkIfDuplicateError middleware:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const upload = multer({ storage: multer.memoryStorage() });

//Registrating expert 
expertRouter.post(
  "/registration",
  checkIfMakingDuplicateProfile,
  checkIfOrgUser,
  authenticateUser,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Image upload failed." });
    }
    addExpert(req, res);
  }
);

//Route of listing all experts
expertRouter.get("/list", listExpert);

//Route of deleting a expert
expertRouter.delete("/:id/remove", removeExpert);

//Route of editing a expert
expertRouter.put("/:id/edit", upload.single("image"), editExpert);

//Backend only route for authenticating user
expertRouter.get("/check-auth", authenticateUser, (req, res) => {
  res.json({ authenticated: true });
});

//Backend only route for not granting permission for org to be expert
expertRouter.get("/check-org", checkIfOrgUser, (req, res) => {
  res.json({ authenticated: true });
});

//Backend only route for not granting permission for expert to readd
expertRouter.get(
  "/check-expert-there",
  checkIfMakingDuplicateProfile,
  (req, res) => {
    res.json({ authenticated: true });
  }
);

//Notifications for expert
expertRouter.get("/:id/notifications", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }
  try {
    const notifications = await callReqModel
      .find({ expertId: id })
      .populate("orgId", "name");
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Rescheduling req accepted messages
expertRouter.get("/:id/rescheduling-requests", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }
  const acceptedReschedules = await acceptedRescheduledRequest.find({
    expertId: id,
  });
  console.log("Accept", acceptedReschedules);
  res.json(acceptedReschedules);
});

//Finding expert details
expertRouter.get("/expert-details/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }
  try {
    const expert = await expertModel.findById(id);
    if (!expert) {
      return res.status(404).json({ error: "expert not found" });
    }
    console.log(expert);

    res.json(expert);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//New Ratings for expert
expertRouter.post("/rating/:id", async (req, res) => {
  const { userId, rating, userName } = req.body;
  const { id } = req.params;

  try {
    const newRating = await ratingModel.create({
      userId,
      rating,
      userName,
    });

    const expert = await expertModel.findById(id);
    if (!expert) {
      return res.status(404).send("Expert not found");
    }

    expert.ratings.push(newRating);
    await expert.save();

    res.status(201).send("Rating submitted successfully");
  } catch (error) {
    console.error("Error saving rating:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Fetching ratings for expert
expertRouter.get("/ratings/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Expert ID is required" });
  }

  try {
    const expert = await expertModel.findById(id).populate("ratings");

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    return res.status(200).json(expert.ratings);
  } catch (error) {
    console.error("Error fetching expert ratings:", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
});

module.exports = expertRouter;
