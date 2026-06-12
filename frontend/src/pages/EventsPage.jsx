import EventCard from "../components/events/EventCard";
import EventCardSkeleton from "../components/events/EventCardSkeleton";
import { useEffect, useState } from "react";
import { getEvents } from "../api/eventApi";
import toast from "react-hot-toast";


export default function EventsPage() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [pageData, setPageData] = useState(null);

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const loadEvents = async (
        searchTitle = title,
        searchLocation = location,
        searchDate = date
    ) => {

        try {

            setLoading(true);
            // setError(null);

            const data = await getEvents({
                title: searchTitle || undefined,
                location: searchLocation || undefined,
                date: searchDate || undefined,
                page: 0,
                size: 12
            });

            setEvents(data.content);
            setPageData(data);

        } catch (err) {

            console.error(err);
            toast.error("Failed to load events");
            // setError("Failed to load events");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return (

        <div className="mx-auto max-w-[1200px] space-y-10 px-6 py-10">

            {/* Header */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                <div>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                        Explore events
                    </h1>

                    <p className="mt-3 text-lg text-slate-600">
                        Discover concerts, conferences, workshops,
                        and unforgettable experiences.
                    </p>

                </div>

            </div>

            {/* Filters */}

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">

                <div className="grid gap-4 md:grid-cols-3">

                    <input
                        type="text"
                        placeholder="Search events"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-12 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-500"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-12 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-500"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="h-12 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-500"
                    />

                </div>

                <div className="mt-4 flex gap-3">

                    <button
                        onClick={() => loadEvents()}
                        className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Search
                    </button>

                    <button
                        onClick={() => {
                            setTitle("");
                            setLocation("");
                            setDate("");
                            loadEvents("", "", "");
                        }}
                        className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Clear Filters
                    </button>

                </div>

            </div>

            {/* Results Count */}

            {!loading && pageData && (
                <p className="text-sm text-slate-500">
                    {pageData.totalElements} event(s) found
                </p>
            )}

            {/* Error

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-600">
                    {error}
                </div>
            )} */}

            {/* Event Grid */}

            {loading ? (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <EventCardSkeleton key={i} />
                    ))}
                </div>

            ) : events.length === 0 ? (

                <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">

                    <h3 className="text-lg font-semibold text-slate-900">
                        No events found
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Try adjusting your filters.
                    </p>

                </div>

            ) : (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {events.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                        />
                    ))}
                </div>

            )}

        </div>
    );
}   