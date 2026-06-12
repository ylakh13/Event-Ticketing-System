import axiosClient from "./axios";

export async function getAdminUsers() {

    const response =
        await axiosClient.get(
            "/api/admin/users"
        );

    return response.data;
}

export async function getAdminEvents() {

    const response =
        await axiosClient.get(
            "/api/admin/events"
        );

    return response.data;
}

export async function updateUserRole(
    userId,
    role
) {

    const response =
        await axiosClient.put(
            `/api/admin/users/${userId}/role`,
            {
                role
            }
        );

    return response.data;
}

export async function deleteUser(
    userId
) {

    await axiosClient.delete(
        `/api/admin/users/${userId}`
    );
}

export async function deleteAdminEvent(
    eventId
) {

    await axiosClient.delete(
        `/api/admin/events/${eventId}`
    );
}

export async function getPlatformAnalytics() {

    const response =
        await axiosClient.get(
            "/api/admin/analytics"
        );

    return response.data;
}