import EventCard from "../components/events/EventCard";

const mockEvents = [

    {
        id: 1,
        title: "Summer Music Festival",
        date: "12 June 2026 • 7:00 PM",
        location: "Mumbai",
        price: "799",
        ticketsRemaining: 124,
        organizer: "LiveNation"
    },

    {
        id: 2,
        title: "Startup Networking Night",
        date: "18 June 2026 • 6:30 PM",
        location: "Bangalore",
        price: "499",
        ticketsRemaining: 80,
        organizer: "Founders Hub"
    },

    {
        id: 3,
        title: "Tech Conference 2026",
        date: "25 June 2026 • 10:00 AM",
        location: "Hyderabad",
        price: "1499",
        ticketsRemaining: 45,
        organizer: "Dev Summit"
    },

    {
        id: 4,
        title: "Stand-up Comedy Night",
        date: "30 June 2026 • 8:00 PM",
        location: "Delhi",
        price: "699",
        ticketsRemaining: 63,
        organizer: "Laugh Arena"
    }

];

export default function EventsPage() {

    return (

        <div className="space-y-10">

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

                    {/* Search */}

                    <input
                        type="text"
                        placeholder="Search events"
                        className="h-12 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-500"
                    />

                    {/* Location */}

                    <input
                        type="text"
                        placeholder="Location"
                        className="h-12 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-500"
                    />

                    {/* Date */}

                    <input
                        type="date"
                        className="h-12 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-500"
                    />

                </div>

            </div>

            {/* Event Grid */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {mockEvents.map(event => (

                    <EventCard
                        key={event.id}
                        event={event}
                    />

                ))}

            </div>

        </div>
    );
}