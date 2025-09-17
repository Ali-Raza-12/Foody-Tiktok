const cloudinary = require("../config/cloudinary");
const bufferToStream = require("./bufferToStream");

function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    bufferToStream(fileBuffer).pipe(
      cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "food-items" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
    );
  });
}

module.exports = uploadToCloudinary;
