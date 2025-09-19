const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    avatar: {
      type: String,
      default: function() {
        const name = this.fullName || "User"; 
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
      },
    },
    bio: {
        type: String
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },   
    verified: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
