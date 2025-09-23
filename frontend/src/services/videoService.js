import api from "../utils/api";

export const getUserVideos = async () => {
    return await api.get("/foodItem/myFoodItems")
}

export const getHomeFeed = async () => {
    return await api.get("foodItems")
}

export const createFoodItem = async (foodItemData) => {
    return await api.post("foodItem/createFoodItem", foodItemData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}



