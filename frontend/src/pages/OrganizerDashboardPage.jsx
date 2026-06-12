import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getMyEvents,
    getOrganizerDashboard,
    getEventAttendees
} from "../api/organizerApi";
import { deleteEvent } from "../api/eventApi";
import toast from "react-hot-toast";

export default function OrganizerDashboardPage() {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {

        async function loadEvents() {
            try {
                const data = await getMyEvents();
                setEvents(data);

                if (data && data.length > 0) {
                    selectEvent(data[0]);
                }

            } catch (err) {
                console.error(err);
                toast.error("Failed to load organizer data");
            } finally {
                setLoading(false);
            }
        }

        loadEvents();

    }, []);

    async function selectEvent(event) {
        try {
            setSelectedEvent(event);

            const [dashboardData, attendeeData] = await Promise.all([
                getOrganizerDashboard(event.id),
                getEventAttendees(event.id)
            ]);

            setDashboard(dashboardData);
            setAttendees(attendeeData);

        } catch (err) {
            console.error(err);
            toast.error("Failed to load event details");
        }
    }

    async function handleDeleteSelectedEvent() {

        if (!selectedEvent) return;

        const confirmed = window.confirm(
            `Delete "${selectedEvent.title}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setDeleting(true);

            await deleteEvent(selectedEvent.id);

            toast.success("Event deleted successfully");

            const remainingEvents = events.filter(
                event => event.id !== selectedEvent.id
            );

            setEvents(remainingEvents);

            if (remainingEvents.length > 0) {
                await selectEvent(remainingEvents[0]);
            } else {
                setSelectedEvent(null);
                setDashboard(null);
                setAttendees([]);
            }

        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to delete event");
        } finally {
            setDeleting(false);
        }
    }

    if (loading) {
        return (
            <div className="py-20 text-center text-slate-500">
                Loading dashboard...
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="mx-auto max-w-3xl px-6 py-20 text-center">

                <h1 className="text-3xl font-bold text-slate-900">
                    No events yet
                </h1>

                <p className="mt-3 text-slate-600">
                    Create your first event to start selling tickets
                    and tracking attendees.
                </p>

                <button
                    onClick={() => navigate("/organizer/events/new")}
                    className="mt-6 rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    Create Event
                </button>

            </div>
        );
    }

    return (

        <div className="mx-auto max-w-7xl px-6 py-10">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Organizer Dashboard
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Monitor events and attendees.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/organizer/events/new")}
                    className="rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    Create Event
                </button>

            </div>

            {/* Layout */}

            <div className="grid gap-8 lg:grid-cols-4">

                {/* Event List */}

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">

                    <h2 className="mb-4 font-semibold">My Events</h2>

                    <div className="space-y-2">

                        {events.map(event => (

                            <button
                                key={event.id}
                                onClick={() => selectEvent(event)}
                                className={`w-full rounded-md p-3 text-left transition ${
                                    selectedEvent?.id === event.id
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "hover:bg-slate-50"
                                }`}
                            >
                                <div className="font-medium text-slate-900">
                                    {event.title}
                                </div>
                                <div className="mt-1 text-sm text-slate-500">
                                    {event.location}
                                </div>
                                <div className="mt-1 text-xs text-slate-400">
                                    {new Date(event.dateTime).toLocaleString()}
                                </div>
                                <div className="mt-2 text-xs font-medium text-indigo-600">
                                    {event.ticketsSold ?? 0} / {event.totalTicketsAvailable ?? 0} tickets sold
                                </div>
                            </button>

                        ))}

                    </div>

                </div>

                {/* Right Side */}

                <div className="space-y-6 lg:col-span-3">

                    {dashboard && (
                        <>
                            <div className="flex flex-wrap gap-3">

                                <button
                                    onClick={() =>
                                        navigate(`/organizer/events/${selectedEvent.id}/edit`)
                                    }
                                    className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
                                >
                                    Edit Event
                                </button>

                                <button
                                    onClick={handleDeleteSelectedEvent}
                                    disabled={deleting}
                                    className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                                >
                                    {deleting ? "Deleting..." : "Delete Event"}
                                </button>

                            </div>

                            <div className="grid gap-4 md:grid-cols-3">

                                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                                    <p className="text-sm text-slate-500">Tickets Sold</p>
                                    <h3 className="mt-2 text-3xl font-bold">
                                        {dashboard.ticketsSold}
                                    </h3>
                                </div>

                                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                                    <p className="text-sm text-slate-500">Total Capacity</p>
                                    <h3 className="mt-2 text-3xl font-bold">
                                        {dashboard.totalTicketsAvailable}
                                    </h3>
                                </div>

                                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                                    <p className="text-sm text-slate-500">Revenue</p>
                                    <h3 className="mt-2 text-3xl font-bold">
                                        INR {Number(dashboard.totalRevenue || 0).toLocaleString("en-IN")}
                                    </h3>
                                </div>

                            </div>
                        </>
                    )}

                    {/* Attendees */}

                    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 p-5">
                            <h2 className="font-semibold">Attendees</h2>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="min-w-full">

                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left">Name</th>
                                        <th className="px-4 py-3 text-left">Email</th>
                                        <th className="px-4 py-3 text-left">Ticket Code</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {attendees.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                                                No attendees yet
                                            </td>
                                        </tr>
                                    ) : (
                                        attendees.map(attendee => (
                                            <tr key={attendee.ticketId} className="border-b">
                                                <td className="px-4 py-3">{attendee.attendeeName}</td>
                                                <td className="px-4 py-3">{attendee.attendeeEmail}</td>
                                                <td className="px-4 py-3 font-mono">{attendee.ticketCode}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}