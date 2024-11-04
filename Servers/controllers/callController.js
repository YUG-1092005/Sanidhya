const CallRequest = require("../models/callReqModel");
const Org = require("../models/orgModel");

// Function to handle call requests with userId to orgId mapping
const handleCallRequest = async (req, res) => {
  const { userId } = req;
  const { adminName, roomNo, date, day, time } = req.body;

  if (!userId || !adminName || !roomNo || !date || !day || !time) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  try {
    const org = await Org.findOne({ userId });
    if (!org) {
      return res.status(404).json({
        success: false,
        message: "Organization not found for the user.",
      });
    }

    const orgId = org._id;
    const newCallRequest = new CallRequest({
      orgId,
      adminName,
      roomNo,
      date,
      day,
      time,
    });

    await newCallRequest.save();

    return res.status(200).json({
      success: true,
      message: "Call request handled successfully.",
      data: newCallRequest,
    });
  } catch (error) {
    console.error("Error saving call request:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving call request.",
    });
  }
};

// Function to get all call requests for an organization
const getCallRequestsForOrg = async (req, res) => {
  const { orgId } = req.params;

  try {
    if (!orgId) {
      return res.status(400).json({
        success: false,
        message: "Organization ID is required.",
      });
    }
    const callRequests = await CallRequest.find({ orgId });
    return res.status(200).json({
      success: true,
      data: callRequests,
    });
  } catch (error) {
    console.error("Error retrieving call requests:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving call requests.",
    });
  }
};

module.exports = {
  handleCallRequest,
  getCallRequestsForOrg,
};
