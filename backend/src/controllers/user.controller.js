import User from "../models/user.model.js";

export const getProfileData = async (req, res) => {

    try {
        const user = req.user;
        const userProfile = await User.findById(user.id);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error: error.message });
    }
}