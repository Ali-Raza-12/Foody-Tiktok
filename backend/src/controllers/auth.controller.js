const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utills/generateToken");
const sendResponseToken = require("../utills/sendTokenResponse");
const ApiError = require("../utills/ApiError");
const foodPartner = require("../models/food-partner.model");



// User auth controller
async function registerUser(req, res, next) {
  try {
    const { fullName, email, address, phone, password } = req.body;

    if (!fullName || !email || !address || !phone || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(400, "Email already Exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    sendResponseToken(res, token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error(400, "All Fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(400, "Invalid Email");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error(400, "Invalid Email or Password");
    }

    const token = generateToken(user._id);
    sendResponseToken(res, token);

    return res.status(200).json({
      message: "Login Successfully",
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logoutUser(req, res, next) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
}



// Food Partner controller
async function registerFoodPartner(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const isExistingPartner = await foodPartner.findOne({ email });

    if (isExistingPartner) {
      throw new ApiError(400, "Email already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartnerUser = await foodPartner.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(foodPartnerUser._id);
    sendResponseToken(res, token);

    return res.status(201).json({
      success: true,
      message: "Food Partner register successfully",
      foodPartner: {
        _id: foodPartnerUser._id,
        name: foodPartnerUser.name,
        email: foodPartnerUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function loginFoodPartner(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await foodPartner.findOne({ email })

    if(!user) {
      throw new ApiError(400, "Invalid Email")
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword) {
      throw new ApiError(400, "Invalid email and password")
    }

    const token = generateToken(user._id);
    sendResponseToken(res, token)

    return res.status(200).json({message: "Login successfully"}) 
  } catch (error) {
    next(error)
  }
}

async function logoutFoodPartner(req, res, next) {
  try {
    res.clearCookie("token")
    return res.status(200).json({message: "Logout successfully"})
  } catch (error) {
    next(error)
  }
}



module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner };
