const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: { type: Number, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const room = mongoose.models.room || mongoose.model("room", roomSchema);
module.exports = room;
