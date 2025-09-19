const express = require("express")
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isAuthenticatedUser } = require("../middlewares/isAuthenticated.foodPartner");


router.get("/profile", isAuthenticatedUser, userController.getProfileData)

module.exports = router;