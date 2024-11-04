const mongoose = require("mongoose");

const acceptedRescheduledRequestSchema = new mongoose.Schema({
  expertName: {
    type: String,
    required: true,
  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "expert",
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
    required: true,
  },
  originalRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reschedulingRequest",
    required: true,
  },
  newDate: {
    type: Date,
    required: true,
  },
  newTime: {
    type: String,
    required: true,
  },
  acceptedAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    default: "Your rescheduling request has been accepted by organization",
  },
});

const acceptedRescheduledRequest =
  mongoose.models.acceptedRescheduledRequest ||
  mongoose.model(
    "acceptedRescheduledRequest",
    acceptedRescheduledRequestSchema
  );
module.exports = acceptedRescheduledRequest;
