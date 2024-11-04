const mongoose = require("mongoose");

const videoCallSchema = new mongoose.Schema({
  callerId: { type: String, required: true },
  receiverId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const videoCall = mongoose.model("videoCall", videoCallSchema);

module.exports = videoCall;
