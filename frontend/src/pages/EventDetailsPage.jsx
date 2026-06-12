import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast"

import {
    CalendarDays,
    MapPin,
    User,
    Ticket
} from "lucide-react";

import { getEventById } from "../api/eventApi";

export default function EventDetailsPage() {

    const { id } = useParams();

    const [event, setEvent] = useState(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        async function loadEvent() {

            try {

                setLoading(true);

                const data =
                    await getEventById(id);

                setEvent(data);

            } catch (err) {

                console.error(err);
                toast.error("Failed to load event");

            } finally {

                setLoading(false);
            }
        }

        loadEvent();

    }, [id]);

    if (loading) {

        return (

            <div className="py-20 text-center text-slate-500">

                Loading event...

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

    return (

        <div className="mx-auto max-w-5xl px-6 py-10">

            {/* Hero */}

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

                <div className="h-72 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />

                <div className="p-8">

                    <p className="text-sm font-medium text-indigo-600">

                        {event.organizerName}

                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">

                        {event.title}

                    </h1>

                    <p className="mt-6 leading-8 text-slate-600">

                        {event.description}
                    </p>

                </div>

            </div>

            {/* Details */}

            <div className="mt-8 grid gap-8 lg:grid-cols-3">

                {/* Left */}

                <div className="lg:col-span-2">

                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-semibold text-slate-900">

                            Event Details

                        </h2>

                        <div className="mt-6 space-y-5">

                            <div className="flex items-center gap-3">

                                <CalendarDays size={18} />

                                <span>

                                    {new Date(
                                        event.dateTime
                                    ).toLocaleString()}

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <MapPin size={18} />

                                <span>

                                    {event.location}

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <User size={18} />

                                <span>

                                    {event.organizerName}

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <Ticket size={18} />

                                <span>

                                    {ticketsRemaining}
                                    {" "}
                                    tickets remaining

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Booking Card */}

                <div>

                    <div className="sticky top-24 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">

                        <p className="text-sm text-slate-500">

                            Ticket Price

                        </p>

                        <h3 className="mt-2 text-3xl font-bold text-slate-900">

                            INR {event.ticketPrice}

                        </h3>

                        <p className="mt-3 text-sm text-slate-500">

                            Secure payment and instant QR ticket delivery.

                        </p>

                        <Link
                            to={`/checkout/${event.id}`}
                            className="mt-6 flex w-full items-center justify-center rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                        >

                            Book tickets

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );
}
