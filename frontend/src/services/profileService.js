import api from "../utils/api";

export const getUserProfile = () => {
    return api.get("user/profile")
}