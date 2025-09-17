const ApiError = require('../utills/ApiError')
const jwt = require("jsonwebtoken")
const foodPartnerModel = require('../models/food-partner.model');
const User = require('../models/user.model');

async function isAuthenticatedPartner(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(400, "Login First")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoded.userId)

        req.foodPartner = foodPartner;
        next()

    } catch (error) {
        next(error)
    }
}

async function isAuthenticatedUser(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        throw new ApiError(400, "Login first")
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId)
        if(!user) {
            throw new ApiError(400, "User not found")
        }

        req.user = user
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = { isAuthenticatedPartner, isAuthenticatedUser };