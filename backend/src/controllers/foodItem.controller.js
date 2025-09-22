const FoodItem = require("../models/food.model");
const ApiError = require("../utils/ApiError");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

async function createFoodItem(req, res, next) {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!title || !description || !file) {
      throw new ApiError(400, "All fields are required");
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    const foodItem = await FoodItem.create({
      title,
      description,
      videoUrl: uploadResult.secure_url,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Food item created successfully",
      foodItem,
    });
  } catch (error) {
    next(error);
  }
}

async function getFoodItems(req, res, next) {
  try {
    const foodItems = await FoodItem.find({});

    return res
      .status(200)
      .json({ message: "Food items fetch successfully", Items: foodItems });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createFoodItem,
  getFoodItems
};
