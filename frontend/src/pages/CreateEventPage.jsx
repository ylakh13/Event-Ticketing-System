import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    createEvent,
    getEventById,
    updateEvent
} from "../api/eventApi";

import toast from "react-hot-toast";

export default function CreateEventPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [title, setTitle] = useState("");

    const [description, setDescription] =
        useState("");

    const [dateTime, setDateTime] =
        useState("");

    const [location, setLocation] =
        useState("");

    const [ticketPrice, setTicketPrice] =
        useState("");

    const [totalTicketsAvailable,
        setTotalTicketsAvailable] =
        useState("");

    const [pageLoading, setPageLoading] =
        useState(false);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {

        if (!isEditMode) {
            return;
        }

        async function loadEvent() {

            try {

                setPageLoading(true);

                const event =
                    await getEventById(id);

                setTitle(
                    event.title ?? ""
                );

                setDescription(
                    event.description ?? ""
                );

                setLocation(
                    event.location ?? ""
                );

                setTicketPrice(
                    event.ticketPrice ?? ""
                );

                setTotalTicketsAvailable(
                    event.totalTicketsAvailable ?? ""
                );

                if (event.dateTime) {

                    setDateTime(
                        event.dateTime.slice(
                            0,
                            16
                        )
                    );
                }

            } catch (err) {

                console.error(err);

                toast.error("Failed to load event details");

            } finally {

                setPageLoading(false);
            }
        }

        loadEvent();

    }, [id, isEditMode]);

    const isFormValid =

        title.trim().length >= 3 &&

        description.trim().length >= 20 &&

        dateTime &&

        location.trim().length > 0 &&

        Number(ticketPrice) > 0 &&

        Number(totalTicketsAvailable) > 0;

    const payload = {

        title,

        description,

        dateTime,

        location,

        ticketPrice:
            Number(ticketPrice),

        totalTicketsAvailable:
            Number(totalTicketsAvailable)

    };

    async function handleSubmit(e) {

        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        try {

            setSubmitting(true);
            setError("");

            if (isEditMode) {

                await updateEvent(
                    id,
                    payload
                );
                toast.success("Event updated successfully!");

            } else {

                await createEvent(
                    payload
                );
                toast.success("Event created successfully!");
            }

            navigate("/organizer");

        } catch (err) {

            console.error(err);

            toast.error(

                err?.response?.data?.message ||

                "Failed to create event"

            );

        } finally {

            setSubmitting(false);
        }
    }

    if (
        pageLoading &&
        isEditMode
    ) {

        return (

            <div className="py-20 text-center text-slate-500">

                Loading event...

            </div>

        );
    }

    return (

        <div className="mx-auto max-w-3xl px-6 py-10">

            <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold text-slate-900">

                    {
                        isEditMode
                            ? "Edit Event"
                            : "Create New Event"
                    }

                </h1>

                <p className="mt-2 text-slate-600">

                    {
                        isEditMode
                            ? "Update your event details."
                            : "Publish a new event for attendees."
                    }

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    {error && (

                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">

                            {error}

                        </div>

                    )}

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Title

                        </label>

                        <input
                            type="text"
                            minLength={3}
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            required
                            className="h-12 w-full rounded-md border border-slate-300 px-4"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Description

                        </label>

                        <textarea
                            rows="4"
                            minLength={20}
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            required
                            className="w-full rounded-md border border-slate-300 p-4"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Date & Time

                        </label>

                        <input
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) =>
                                setDateTime(
                                    e.target.value
                                )
                            }
                            required
                            className="h-12 w-full rounded-md border border-slate-300 px-4"
                        />

                        <p className="mt-2 text-sm text-slate-500">

                            Choose the event's local date and time.

                        </p>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Location

                        </label>

                        <input
                            type="text"
                            value={location}
                            onChange={(e) =>
                                setLocation(
                                    e.target.value
                                )
                            }
                            required
                            className="h-12 w-full rounded-md border border-slate-300 px-4"
                        />

                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block text-sm font-medium">

                                Ticket Price (INR)

                            </label>

                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={ticketPrice}
                                onChange={(e) =>
                                    setTicketPrice(
                                        e.target.value
                                    )
                                }
                                required
                                className="h-12 w-full rounded-md border border-slate-300 px-4"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">

                                Total Tickets

                            </label>

                            <input
                                type="number"
                                min="1"
                                value={totalTicketsAvailable}
                                onChange={(e) =>
                                    setTotalTicketsAvailable(
                                        e.target.value
                                    )
                                }
                                required
                                className="h-12 w-full rounded-md border border-slate-300 px-4"
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={
                            submitting ||
                            !isFormValid
                        }
                        className="
                            w-full
                            rounded-md
                            py-3
                            font-semibold
                            text-white
                            transition
                            bg-indigo-600
                            hover:bg-indigo-700
                            disabled:cursor-not-allowed
                            disabled:bg-slate-300
                        "
                    >

                        {
                            submitting
                                ? (
                                    isEditMode
                                        ? "Updating Event..."
                                        : "Creating Event..."
                                )
                                : (
                                    isEditMode
                                        ? "Update Event"
                                        : "Create Event"
                                )
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}   