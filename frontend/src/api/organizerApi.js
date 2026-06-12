import axiosClient from "./axios";

export async function getMyEvents() {

    const response =
        await axiosClient.get(
            "/api/organizers/events"
        );

    return response.data;
}

export async function getOrganizerDashboard(
    eventId
) {

    const response =
        await axiosClient.get(
            `/api/organizers/me/dashboard/${eventId}`
        );

    return response.data;
}

export async function getEventAttendees(
    eventId
) {

    const response =
        await axiosClient.get(
            `/api/organizers/me/events/${eventId}/attendees`
        );

    return response.data;
}