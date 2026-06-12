import {
    CalendarDays,
    MapPin,
    Ticket
} from "lucide-react";

import { Link } from "react-router-dom";

export default function EventCard({
    event
}) {

    const ticketsRemaining = (event.totalTicketsAvailable ?? 0) - (event.ticketsSold ?? 0);

    return (

        <Link
            to={`/events/${event.id}`}
            className="block overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >

            {/* Image Placeholder */}

            <div className="h-48 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400" />

            {/* Content */}

            <div className="p-5">

                {/* Organizer */}

                <p className="text-sm font-medium text-indigo-600">

                    {event.organizerName}

                </p>

                {/* Title */}

                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">

                    {event.title}

                </h3>

                {/* Meta */}

                <div className="mt-5 space-y-3">

                    <div className="flex items-center gap-3 text-sm text-slate-600">

                        <CalendarDays size={16} />

                        <span>
                            {new Date(event.dateTime).toLocaleString()}
                        </span>

                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">

                        <MapPin size={16} />

                        <span>
                            {event.location}
                        </span>

                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">

                        <Ticket size={16} />

                        <span>
                            {ticketsRemaining} tickets remaining
                        </span>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-6 flex items-center justify-between">

                    <div>

                        <p className="text-sm text-slate-500">
                            Starting from
                        </p>

                        <h4 className="text-lg font-bold text-slate-900">

                            INR {event.ticketPrice}

                        </h4>

                    </div>

                    <Link
                        to={`/events/${event.id}`}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >

                        View details

                    </Link>

                </div>

            </div>

        </Link>
    );
}