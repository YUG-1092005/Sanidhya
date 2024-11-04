const mongoose = require("mongoose");

const attendesSchema = new mongoose.Schema({
  attendeIdentification: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const workshopRegistrationModel =
  mongoose.models.workshopAttende ||
  mongoose.model("workshopAttende", attendesSchema);
module.exports = workshopRegistrationModel;
