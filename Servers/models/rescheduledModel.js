const mongoose = require("mongoose");

const rescheduleRequestSchema = new mongoose.Schema(
  {
    expertName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
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
      required: true,
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expert",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const rescheduleRequest =
  mongoose.models.rescheduleRequest ||
  mongoose.model("rescheduleRequest", rescheduleRequestSchema);

module.exports = rescheduleRequest;
