const mongoose = require("mongoose")

const FoodPartnerSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model( "FoodPartner", FoodPartnerSchema)