const orgModel = require("../models/orgModel");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../uploads/cloudinary");

//Controller for adding new org
const addOrg = async (req, res) => {
  const userId = req.userId;
  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed." });
  }

  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "orgs",
      },
      async (error, result) => {
        if (error) {
          console.error("Error while uploading to Cloudinary", error);
          return res
            .status(500)
            .json({ success: false, message: "Image upload failed." });
        }

        const org = new orgModel({
          userId: userId,
          orgName: req.body.orgName,
          roomNo: req.body.roomNo,
          image: result.secure_url,
          email: req.body.email,
          description: req.body.description,
          username: req.body.username,
          password: req.body.password,
          phoneNo: req.body.phoneNo,
          adminName: req.body.adminName,
          place: req.body.place,
        });
        await org.save();
        res.json({ success: true, message: "Organization added" });
      }
    );
    stream.end(req.file.buffer);
  } catch (e) {
    console.log("Error while saving new Org", e);
    res.json({ success: false, message: "Organization not added" });
  }
};

//Controller for listing expert
const listOrg = async (req, res) => {
  try {
    const orgs = await orgModel.find({});
    res.json({ success: true, data: orgs });
  } catch (error) {
    console.log("Error while showing orgs", error);
    res.json({ success: false, message: "Error while showing orgs" });
  }
};

//Controller for deleting org
const removeOrg = async (req, res) => {
  const { orgId } = req.params;
  if (!orgId) {
    return res
      .status(400)
      .json({ success: false, message: "Org ID is required" });
  }

  try {
    const org = await orgModel.findById(orgId);
    if (!org) {
      return res
        .status(404)
        .json({ success: false, message: "Organization not found" });
    }

    console.log(org, "org");

    if (org.image) {
      const imagePath = path.join("uploads", org.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error while deleting image:", err);
        }
      });
    }

    await orgModel.findByIdAndDelete(orgId);
    res.json({ success: true, message: "Organization deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while deleting organization" });
  }
};

//Controller for editing org
const editOrg = async (req, res) => {
  try {
    const { orgId } = req.params;
    const updateFields = { ...req.body };

    if (!orgId) {
      return res
        .status(400)
        .json({ success: false, message: "Org ID is required" });
    }

    const org = await orgModel.findById(orgId);

    if (!org) {
      return res.status(404).json({ success: false, message: "Org not found" });
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

    const updatedOrg = await orgModel.findByIdAndUpdate(orgId, updateFields, {
      new: true,
    });
    res.json({
      success: true,
      message: "Org updated successfully",
      data: updatedOrg,
    });
  } catch (error) {
    console.error("Error while updating org:", error);
    res
      .status(500)
      .json({ success: false, message: "Error while updating org" });
  }
};
module.exports = { addOrg, listOrg, removeOrg, editOrg };
