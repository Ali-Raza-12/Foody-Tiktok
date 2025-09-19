import api from "../utils/api"

export const registerUser = (userData) => {
    return api.post('/auth/register', userData)
}

export const loginUser = (userData) => {
    return api.post('/auth/login', userData)
}

export const registerPartner = (partnerData) => {
    return api.post('auth/food-partner/register', partnerData)
}

export const loginPartner = (partnerData) => {
    return api.post('auth/food-partner/login', partnerData)
}