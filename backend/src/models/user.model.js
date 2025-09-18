const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);