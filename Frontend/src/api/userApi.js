import axios from "axios"

const BASE_URL = "http://localhost:5000/api/users"

export async function loginUser(credentials) {
    try {
        const res = await axios.post(`${BASE_URL}/login`, credentials);
        return res.data
    } catch (error) {
        if (error.response && error.response.data) throw error.response.data
        throw { message: error.message || "Login failed" };
    }
}

export async function registerUser(userInfo) {
    try {
        const res = await axios.post(`${BASE_URL}/register`, userInfo)
        return res.data
    } catch (error) {
        if (error.response && error.response.data) throw error.response.data
        throw { message: error.message || "Failed to register user" }
    }
}