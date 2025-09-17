const express = require("express")
const router = express.Router();
const foodItemController = require('../controllers/foodItem.controller')
const isAuthenticatedMiddleware = require("../middlewares/isAuthenticated.foodPartner")
const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage()
})


router.get('/', isAuthenticatedMiddleware.isAuthenticatedUser,  foodItemController.getFoodItems)
router.post('/createFoodItem', isAuthenticatedMiddleware.isAuthenticatedPartner, upload.single("video"), foodItemController.createFoodItem)


module.exports = router;