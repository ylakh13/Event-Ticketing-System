import axiosClient from "./axios";

export async function getMyTickets() {
    const response =
        await axiosClient.get(
            "/api/users/me/tickets"
        );

    return response.data;

}
