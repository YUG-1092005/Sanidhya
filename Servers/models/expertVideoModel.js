// models/Expert.js
const mongoose = require("mongoose");

const expertVideoSchema = new mongoose.Schema({
  expertId: {
    type: String,
    required: true,
    unique: true,
  },
  expertName: {
    type: String,
    required: true,
  },
  meetingId: {
    type: String,
    required: true,
  },
});

const expertVideoId = mongoose.model("expertVideoId", expertVideoSchema);

module.exports = expertVideoId;
