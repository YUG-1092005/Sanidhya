const express = require("express");
const messageRouter = express.Router();
const roomModel = require("../roomModel.js");
const messageModel = require("../messageModel.js");
const { getUser } = require("../Users.js");

messageRouter.post("/create-room", async (req, res) => {
  console.log("Create room request received:", req.body);
  const { roomId } = req.body;
  if (!roomId) {
    return res.status(400).json({
      message: "Room ID is required.",
    });
  }
  try {
    const existingRoom = await roomModel.findOne({ roomId });
    console.log("EXISTING", existingRoom);
    if (existingRoom) {
      return res.status(200).json({ message: "Room already exists.", roomId });
    }

    const newRoom = new roomModel({ roomId });
    await newRoom.save();
    res.status(201).json({ message: "Room created successfully." });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

messageRouter.get("/user/:socketId", (req, res) => {
  const socketId = req.params.socketId;
  if (!socketId) {
    return res.status(400).json({ error: "Socket ID is required" });
  }

  const user = getUser(socketId);

  if (user) {
    res.json({ name: user.name });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Retrieve messages from a room
messageRouter.get("/messages/:roomId", async (req, res) => {
  const { roomId } = req.params;
  if (!roomId) {
    return res.status(400).json({
      message: "Room ID is required.",
    });
  }

  try {
    const messages = await messageModel.find({ roomId }).sort({ timestamp: 1 });
    if (!messages.length) {
      return res.status(404).json({
        message: "No messages found for this room.",
      });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = messageRouter;
