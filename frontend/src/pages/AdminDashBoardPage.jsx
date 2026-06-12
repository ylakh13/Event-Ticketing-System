import { useEffect, useState } from "react";

import {
    getAdminUsers,
    getAdminEvents,
    getPlatformAnalytics,
    updateUserRole,
    deleteUser,
    deleteAdminEvent
} from "../api/adminApi";

import toast from "react-hot-toast";

export default function AdminDashBoardPage() {

    const [analytics, setAnalytics] =
        useState(null);

    const [updatingUserId, setUpdatingUserId] =
        useState(null);

    const [deletingUserId, setDeletingUserId] =
        useState(null);

    const [deletingEventId, setDeletingEventId] =
        useState(null);

    const [users, setUsers] =
        useState([]);

    const [events, setEvents] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                setLoading(true);

                const [
                    analyticsData,
                    usersData,
                    eventsData
                ] = await Promise.all([

                    getPlatformAnalytics(),

                    getAdminUsers(),

                    getAdminEvents()

                ]);

                setAnalytics(
                    analyticsData
                );

                setUsers(
                    usersData
                );

                setEvents(
                    eventsData
                );

            } catch (err) {

                console.error(err);

                toast.error(
                    err?.response?.data?.message ||
                    "Failed to load admin dashboard"
                );

            } finally {

                setLoading(false);
            }
        }

        loadDashboard();

    }, []);

    async function handleRoleChange(
        userId,
        role
    ) {

        try {

            setUpdatingUserId(
                userId
            );

            const updatedUser =
                await updateUserRole(
                    userId,
                    role
                );

            setUsers(prevUsers =>

                prevUsers.map(user =>

                    user.id === userId
                        ? updatedUser
                        : user

                )

            );

        } catch (err) {

            console.error(err);

            toast.error(

                err?.response?.data?.message ||

                "Failed to update user role"

            );

        } finally {

            setUpdatingUserId(
                null
            );
        }
    }

    async function handleDeleteUser(
        user
    ) {

        const confirmed =
            window.confirm(
                `Delete user "${user.email}"? This action cannot be undone.`
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingUserId(
                user.id
            );

            await deleteUser(
                user.id
            );
            toast.success("User deleted successfully");

            setUsers(prevUsers =>

                prevUsers.filter(
                    existingUser =>

                        existingUser.id !==
                        user.id
                )

            );

            await loadAnalytics();

        } catch (err) {

            console.error(err);

            toast.error(

                err?.response?.data?.message ||

                "Failed to delete user"

            );

        } finally {

            setDeletingUserId(
                null
            );
        }
    }

    async function handleDeleteEvent(
        event
    ) {

        const confirmed =
            window.confirm(
                `Delete event "${event.title}"? This action cannot be undone.`
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingEventId(
                event.id
            );

            await deleteAdminEvent(
                event.id
            );
            toast.success("Event deleted successfully");

            setEvents(prevEvents =>

                prevEvents.filter(
                    existingEvent =>

                        existingEvent.id !==
                        event.id
                )

            );

            await loadAnalytics();

        } catch (err) {

            console.error(err);

            toast.error(

                err?.response?.data?.message ||

                "Failed to delete event"

            );

        } finally {

            setDeletingEventId(
                null
            );
        }
    }

    async function loadAnalytics() {
        try {
            const analyticsData = await getPlatformAnalytics();
            setAnalytics(analyticsData);
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) {

        return (

            <div className="py-20 text-center text-slate-500">

                Loading dashboard...

            </div>

        );
    }

    return (

        <div className="mx-auto max-w-7xl px-6 py-10">

            {/* Header */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Admin Dashboard

                </h1>

                <p className="mt-2 text-slate-600">

                    Platform overview and management.

                </p>

            </div>

            {/* Analytics */}

            <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">

                    <p className="text-sm text-slate-500">

                        Total Users

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        {analytics?.totalUsers ?? 0}

                    </h2>

                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">

                    <p className="text-sm text-slate-500">

                        Total Events

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        {analytics?.totalEvents ?? 0}

                    </h2>

                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">

                    <p className="text-sm text-slate-500">

                        Tickets Sold

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        {analytics?.totalTicketsSold ?? 0}

                    </h2>

                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">

                    <p className="text-sm text-slate-500">

                        Revenue

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        INR {
                            Number(
                                analytics?.totalRevenue || 0
                            ).toLocaleString("en-IN")
                        }

                    </h2>

                </div>

            </div>

            {/* Users */}

            <div className="mb-10 rounded-lg border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 p-5">

                    <h2 className="text-xl font-semibold">

                        Users

                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="px-4 py-3 text-left">

                                    Name

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Email

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Role

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-slate-500"
                                    >

                                        No users found

                                    </td>

                                </tr>

                            ) : (

                                users.map(user => (

                                    <tr
                                        key={user.id}
                                        className="border-b"
                                    >

                                        <td className="px-4 py-3">

                                            {user.name}

                                        </td>

                                        <td className="px-4 py-3">

                                            {user.email}

                                        </td>

                                        <td className="px-4 py-3">

                                            <select
                                                value={user.role}
                                                disabled={
                                                    updatingUserId === user.id
                                                }
                                                onChange={(e) =>

                                                    handleRoleChange(
                                                        user.id,
                                                        e.target.value
                                                    )

                                                }
                                                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                                            >

                                                <option value="ROLE_USER">

                                                    ROLE_USER

                                                </option>

                                                <option value="ROLE_ORGANIZER">

                                                    ROLE_ORGANIZER

                                                </option>

                                                <option value="ROLE_ADMIN">

                                                    ROLE_ADMIN

                                                </option>

                                            </select>

                                        </td>

                                        <td className="px-4 py-3">

                                            <button
                                                onClick={() =>
                                                    handleDeleteUser(
                                                        user
                                                    )
                                                }
                                                disabled={
                                                    deletingUserId ===
                                                    user.id
                                                }
                                                className="
            rounded-md
            border
            border-red-200
            px-3
            py-2
            text-sm
            font-medium
            text-red-600
            hover:bg-red-50
            disabled:cursor-not-allowed
            disabled:opacity-60
        "
                                            >

                                                {
                                                    deletingUserId ===
                                                        user.id

                                                        ? "Deleting..."

                                                        : "Delete"
                                                }

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Events */}

            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 p-5">

                    <h2 className="text-xl font-semibold">

                        Events

                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="px-4 py-3 text-left">
                                    Title
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Location
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Price
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {events.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-slate-500"
                                    >

                                        No events found

                                    </td>

                                </tr>

                            ) : (

                                events.map(event => (

                                    <tr
                                        key={event.id}
                                        className="border-b"
                                    >

                                        <td className="px-4 py-3">

                                            {event.title}

                                        </td>

                                        <td className="px-4 py-3">

                                            {event.location}

                                        </td>

                                        <td className="px-4 py-3">

                                            INR {
                                                Number(
                                                    event.ticketPrice || 0
                                                ).toLocaleString("en-IN")
                                            }

                                        </td>

                                        <td className="px-4 py-3">

                                            <button
                                                onClick={() =>
                                                    handleDeleteEvent(
                                                        event
                                                    )
                                                }
                                                disabled={
                                                    deletingEventId ===
                                                    event.id
                                                }
                                                className="
            rounded-md
            border
            border-red-200
            px-3
            py-2
            text-sm
            font-medium
            text-red-600
            hover:bg-red-50
            disabled:cursor-not-allowed
            disabled:opacity-60
        "
                                            >

                                                {
                                                    deletingEventId ===
                                                        event.id

                                                        ? "Deleting..."

                                                        : "Delete"
                                                }

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}