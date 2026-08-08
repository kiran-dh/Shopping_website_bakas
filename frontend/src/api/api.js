import { auth } from "../firebase";

const API_URL = "http://localhost:5000/api";

export const api = async (endpoint, options = {}) => {
    const user = auth.currentUser;

    const token = user
        ? await user.getIdToken()
        : null;

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`
            }),
            ...options.headers
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
};