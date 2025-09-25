const express = require("express")
const authController = require('../controllers/auth.controller')

const router = express.Router();

// User auth routes 
router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/logout", authController.logoutUser)

module.exports = router
