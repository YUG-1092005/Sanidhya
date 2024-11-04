const mongoose = require("mongoose");

const callReqSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "expert",
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
});

const callReqModel =
  mongoose.models.callReq || mongoose.model("callReq", callReqSchema);

module.exports = callReqModel;
