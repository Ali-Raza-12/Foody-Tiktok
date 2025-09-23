const express = require("express")
const router = express.Router();
const foodItemController = require('../controllers/foodItem.controller')
const isAuthenticatedMiddleware = require("../middlewares/isAuthenticated.foodPartner")
const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage()
})


router.get('/', isAuthenticatedMiddleware.isAuthenticatedUser,  foodItemController.getHomeFeed)
router.get('/myFoodItems', isAuthenticatedMiddleware.isAuthenticatedUser,  foodItemController.getUserFoodItems)
router.post('/createFoodItem', isAuthenticatedMiddleware.isAuthenticatedUser, upload.single("video"), foodItemController.createFoodItem)


module.exports = router;