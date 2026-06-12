import axiosClient from "./axios";

export async function createCheckout({

    eventId,

    quantity

}) {
    const response =
        await axiosClient.post(
            "/api/orders/checkout",
            {
                eventId,
                quantity
            }
        );

    return response.data;
}
