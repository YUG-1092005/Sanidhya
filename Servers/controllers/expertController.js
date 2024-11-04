const expertModel = require("../models/expertModel");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../uploads/cloudinary");

//Controller for adding expert
const addExpert = async (req, res) => {
  const userId = req.userId;

  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed." });
  }

  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "experts",
      },
      async (error, result) => {
        if (error) {
          console.error("Error while uploading to Cloudinary", error);
          return res
            .status(500)
            .json({ success: false, message: "Image upload failed." });
        }

        const expert = new expertModel({
          userId: userId,
          name: req.body.name,
          profession: req.body.profession,
          image: result.secure_url,
          email: req.body.email,
          description: req.body.description,
          username: req.body.username,
          password: req.body.password,
          experience: req.body.experience,
          expertise: req.body.expertise,
          workingIn: req.body.workingIn,
          socialMedia: req.body.socials,
        });

        await expert.save();
        return res.json({ success: true, message: "Expert added" });
      }
    );

    stream.end(req.file.buffer);
  } catch (e) {
    console.error("Error while saving new expert", e);
    res.status(500).json({ success: false, message: "Expert not added" });
  }
};

//Controller for listing expert
const listExpert = async (req, res) => {
  try {
    const experts = await expertModel.find().populate("userId", "_id");
    res.json({ success: true, data: experts });
  } catch (error) {
    console.log("Error while showing experts", error);
    res.json({ success: false, message: "Error while showing experts" });
  }
};

//Controller for deleting expert
const removeExpert = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Expert ID is required" });
  }

  try {
    const expert = await expertModel.findById(id);
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: "Expert not found.",
      });
    }
    if (expert.image) {
      const imagePath = path.join("uploads", expert.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error while deleting image:", err);
        }
      });
    }

    await expertModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Expert deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while deleting expert" });
  }
};

//Controller for editing expert
const editExpert = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Expert ID is required" });
    }

    const expert = await expertModel.findById(id);

    if (!expert) {
      return res
        .status(404)
        .json({ success: false, message: "Expert not found" });
    }

    if (req.file) {
      console.log("Received file:", req.file);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(error);
            }
            resolve(result);
          }
        );

        uploadStream.end(req.file.buffer);
      });

      updateFields.image = result.secure_url;
    } else {
      console.error("No file uploaded");
      return res
        .status(400)
        .json({ success: false, message: "File is required." });
    }

    const updatedExpert = await expertModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );
    res.json({
      success: true,
      message: "Expert updated successfully",
      data: updatedExpert,
    });
  } catch (error) {
    console.error("Error while updating expert:", error);
    res
      .status(500)
      .json({ success: false, message: "Error while updating expert" });
  }
};

module.exports = { addExpert, listExpert, removeExpert, editExpert };
