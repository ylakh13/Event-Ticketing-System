import axiosInstance from "./axios";

export const login = async (data) => {

    const response = await axiosInstance.post(
        "/api/auth/login",
        data
    );

    return response.data;
};

export const register = async (data) => {
    
    const response = await axiosInstance.post(
        "/api/auth/register",
        data
    );

    return response.data;
};
