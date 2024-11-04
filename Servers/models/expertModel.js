const mongoose = require("mongoose");
const rating = require("./ratingModel");

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
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
  experience: {
    type: Number,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  workingIn: {
    type: String,
    required: true,
  },
  socialMedia: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length <= 2;
      },
      message:
        "A maximum of 2 social media links is allowed i.e. Facebook or Instagram!",
    },
    required: false,
  },
  ratings: [rating.schema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const expertModel =
  mongoose.models.expert || mongoose.model("expert", expertSchema);

module.exports = expertModel;
