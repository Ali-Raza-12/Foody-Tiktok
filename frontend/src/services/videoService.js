import api from "../utils/api";

export const getVideos = async () => {
    return await api.get("/foodItem")
}

export const createFoodItem = async (foodItemData) => {
    return await api.post("/foodItemCreate", foodItemData)
}

