import { useEffect, useState } from "react";

import { getMyTickets }
    from "../api/ticketApi";

import TicketCard
    from "../components/tickets/TicketCard";

export default function UserTicketsPage() {

    const [tickets, setTickets] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    useEffect(() => {

        async function loadTickets() {

            try {

                setLoading(true);

                const data =
                    await getMyTickets();

                setTickets(data);

            } catch (err) {

                console.error(err);

                setError(
                    "Failed to load tickets"
                );

            } finally {

                setLoading(false);
            }
        }

        loadTickets();

    }, []);

    if (loading) {

        return (

            <div className="py-20 text-center text-slate-500">

                Loading tickets...

            </div>

        );
    }

    if (error) {

        return (

            <div className="py-20 text-center text-red-500">

                {error}

            </div>

        );
    }

    return (

        <div className="mx-auto max-w-5xl px-6 py-10">

            <div className="mb-10">

                <h1 className="text-4xl font-bold tracking-tight text-slate-900">

                    My Tickets

                </h1>

                <p className="mt-3 text-lg text-slate-600">

                    View all tickets you've purchased.

                </p>

            </div>

            {tickets.length === 0 ? (

                <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">

                    <h3 className="text-xl font-semibold text-slate-900">

                        No tickets yet

                    </h3>

                    <p className="mt-3 text-slate-500">

                        Purchase an event ticket to see it here.

                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {tickets.map(ticket => (

                        <TicketCard
                            key={ticket.ticketId}
                            ticket={ticket}
                        />

                    ))}

                </div>

            )}

        </div>

    );
}