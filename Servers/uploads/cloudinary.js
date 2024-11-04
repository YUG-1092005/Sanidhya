const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.VITE_CLOUD_NAME,
    api_key:process.env.VITE_CLOUD_API_KEY,
    api_secret:process.env.VITE_CLOUD_API_SECRET,
});

module.exports = cloudinary