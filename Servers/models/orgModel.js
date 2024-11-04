const mongoose = require("mongoose");

const defaultRoomNumber = () => Math.floor(1000 + Math.random() * 9000);

const orgSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
    default: defaultRoomNumber,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const orgModel =
  mongoose.models.organization || mongoose.model("organization", orgSchema);

module.exports = orgModel;
