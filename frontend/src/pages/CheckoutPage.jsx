import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/eventApi";
import { createCheckout } from "../api/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function PaymentForm({ total }) {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!stripe || !elements) return;

        try {
            setLoading(true);

            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/tickets`
                }
            });

            if (error) {
                toast.error(error.message);
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div className="rounded-md bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Total to pay</p>
                <h3 className="mt-1 text-2xl font-bold">INR {total}</h3>
            </div>

            <PaymentElement />

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
                {loading ? "Processing..." : `Pay INR ${total}`}
            </button>

        </form>
    );
}

export default function CheckoutPage() {

    const { eventId } = useParams();

    const [event, setEvent] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    useEffect(() => {

        async function loadEvent() {
            try {
                setLoading(true);
                const data = await getEventById(eventId);
                setEvent(data);

                const remaining = (data.totalTicketsAvailable ?? 0) - (data.ticketsSold ?? 0);
                setQuantity(remaining > 0 ? 1 : 0);

            } catch (err) {
                console.error(err);
                toast.error("Failed to load event");
            } finally {
                setLoading(false);
            }
        }

        loadEvent();

    }, [eventId]);

    async function handleCheckout() {
        if (ticketsRemaining <= 0) {
            toast.error("This event is sold out");
            return;
        }

        try {
            setCheckoutLoading(true);

            const data = await createCheckout({
                eventId: Number(eventId),
                quantity
            });

            setClientSecret(data.clientSecret);

        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Checkout failed");
        } finally {
            setCheckoutLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="py-20 text-center text-slate-500">
                Loading checkout...
            </div>
        );
    }

    if (!event) {
        return (
            <div className="py-20 text-center text-slate-500">
                Event not found
            </div>
        );
    }

    const ticketsRemaining =
        (event.totalTicketsAvailable ?? 0) -
        (event.ticketsSold ?? 0);

    const total = (event.ticketPrice ?? 0) * quantity;

    return (
        <div className="mx-auto max-w-3xl px-6 py-10">

            <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold text-slate-900">
                    Checkout
                </h1>

                <p className="mt-2 text-slate-600">
                    Complete your ticket purchase.
                </p>

                <div className="mt-8 space-y-6">

                    <div>
                        <h2 className="text-xl font-semibold">
                            {event.title}
                        </h2>
                        <p className="mt-2 text-slate-600">
                            INR {event.ticketPrice} per ticket
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            {ticketsRemaining > 0
                                ? `${ticketsRemaining} tickets remaining`
                                : "Sold out"}
                        </p>
                    </div>

                    {!clientSecret && (
                        <>
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={ticketsRemaining}
                                    value={quantity}
                                    onChange={(e) => {
                                        let value = Number(e.target.value);
                                        if (value < 1) value = 1;
                                        if (ticketsRemaining > 0 && value > ticketsRemaining) {
                                            value = ticketsRemaining;
                                        }
                                        setQuantity(value);
                                    }}
                                    className="h-12 w-32 rounded-md border border-slate-300 px-4"
                                />
                            </div>

                            <div className="rounded-md bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">Estimated Total</p>
                                <h3 className="mt-1 text-2xl font-bold">INR {total}</h3>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={checkoutLoading || ticketsRemaining <= 0}
                                className={`w-full rounded-md py-3 font-semibold text-white transition ${ticketsRemaining <= 0
                                        ? "cursor-not-allowed bg-slate-400"
                                        : "bg-indigo-600 hover:bg-indigo-700"
                                    }`}
                            >
                                {checkoutLoading
                                    ? "Creating payment..."
                                    : ticketsRemaining <= 0
                                        ? "Sold Out"
                                        : "Continue to payment"}
                            </button>
                        </>
                    )}

                    {clientSecret && (
                        <Elements
                            stripe={stripePromise}
                            options={{ clientSecret }}
                        >
                            <PaymentForm total={total} />
                        </Elements>
                    )}

                </div>

            </div>

        </div>
    );
}