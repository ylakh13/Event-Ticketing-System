import axiosClient from "../api/axios";

export async function login(credentials) {

    const response = await axiosClient.post(
        "/api/auth/login",
        credentials
    );

    return response.data;
}

export async function register(userData) {

    const response = await axiosClient.post(
        "/api/auth/register",
        userData
    );

    return response.data;
}