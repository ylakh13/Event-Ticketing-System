import {
    CalendarDays,
    MapPin,
    CheckCircle,
    Ticket
} from "lucide-react";

export default function TicketCard({
    ticket
}) {
    return (

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">

                <div className="flex-1">

                    <div className="mb-4 flex items-center gap-2">

                        <CheckCircle
                            size={18}
                            className="text-green-600"
                        />

                        <span className="rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-700">

                            Valid Ticket

                        </span>

                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        {ticket.eventTitle}

                    </h2>

                    <div className="mt-5 space-y-3 text-slate-600">

                        <div className="flex items-center gap-3">

                            <CalendarDays size={16} />

                            <span>

                                {new Date(
                                    ticket.eventDateTime
                                ).toLocaleString()}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <MapPin size={16} />

                            <span>

                                {ticket.eventLocation}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <Ticket size={16} />

                            <span>

                                Order #{ticket.orderId}

                            </span>

                        </div>

                    </div>

                    <div className="mt-6">

                        <p className="mb-2 text-sm text-slate-500">

                            Ticket Code

                        </p>

                        <code className="rounded-md bg-slate-100 px-3 py-2 font-mono text-sm">

                            {ticket.uniqueCode}

                        </code>

                    </div>

                </div>

                {/* QR Placeholder */}

                <div className="flex h-36 w-36 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">

                    <span className="text-center text-xs text-slate-400">

                        QR Ticket
                        <br />
                        Coming Soon

                    </span>

                </div>

            </div>

        </div>

    );
}
