const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: {
    type: Number,
    ref: "room",
    required: true,
  },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const message =
  mongoose.models.message || mongoose.model("message", messageSchema);
module.exports = message;
