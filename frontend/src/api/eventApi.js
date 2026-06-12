import axiosClient from "./axios";

export async function getEvents({
    title,
    location,
    date,
    page = 0,
    size = 12
} = {}) {

    const response =
        await axiosClient.get("/api/events", {

            params: {
                title,
                location,
                date,
                page,
                size
            }

        });

    return response.data;
}

export async function getEventById(id) {

    const response = await axiosClient.get(
        `/api/events/${id}`
    );

    return response.data;
}

export async function createEvent(
    eventData
) {

    const response =
        await axiosClient.post(
            "/api/events",
            eventData
        );

    return response.data;
}

export async function updateEvent(
    id,
    eventData
) {
    const response =
        await axiosClient.put(
            `/api/events/${id}`,
            eventData
        );

    return response.data;
}

export async function deleteEvent(id) {
    await axiosClient.delete(`/api/events/${id}`);
}