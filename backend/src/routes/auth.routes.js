const express = require("express")
const authController = require('../controllers/auth.controller')

const router = express.Router();

// User auth routes 
router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/logout", authController.logoutUser)


// Food Partner routes 
router.post('/food-partner/register', authController.registerFoodPartner)
router.post("/food-partner/login", authController.loginFoodPartner)
router.post('/food-partner/logout', authController.logoutFoodPartner)


module.exports = router
