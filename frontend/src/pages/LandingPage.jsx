import {
    ArrowRight,
    CalendarDays,
    Ticket,
    ShieldCheck,
    QrCode,
    Users,
    BarChart3,
    Sparkles
} from "lucide-react";

import { Link } from "react-router-dom";

export default function LandingPage() {

    return (

        <div>
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
                <div className="mx-auto max-w-[1200px] px-6 py-24">

                    {/* Hero Section */}

                    <section className="grid items-center gap-14 py-10 lg:grid-cols-2">

                        {/* Left */}

                        <div>

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300">

                                <Sparkles size={16} />

                                Modern Event Ticketing Platform

                            </div>

                            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl">

                                Discover and manage unforgettable live experiences.

                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">

                                Evently helps users discover events, organizers sell tickets,
                                and teams manage everything with secure payments and QR ticketing.

                            </p>

                            {/* CTA */}

                            <div className="mt-10 flex flex-wrap items-center gap-4">

                                <Link
                                    to="/events"
                                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >

                                    Browse events

                                    <ArrowRight size={18} />

                                </Link>

                                <Link
                                    to="/register"
                                    className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                                >

                                    Start selling

                                </Link>

                            </div>

                        </div>

                        {/* Right Preview */}

                        <div className="relative">

                            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">

                                {/* Top */}

                                <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                                    <div>

                                        <p className="text-sm font-medium text-slate-500">
                                            Upcoming Event
                                        </p>

                                        <h3 className="mt-1 text-xl font-semibold text-slate-900">
                                            Summer Music Festival
                                        </h3>

                                    </div>

                                    <div className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">

                                        Live

                                    </div>

                                </div>

                                {/* Event Cards */}

                                <div className="mt-6 space-y-4">

                                    <div className="rounded-lg border border-slate-200 p-4">

                                        <div className="flex items-start justify-between">

                                            <div>

                                                <h4 className="font-semibold text-slate-900">
                                                    VIP Tickets
                                                </h4>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Front-row access - QR entry
                                                </p>

                                            </div>

                                            <span className="text-sm font-semibold text-indigo-600">
                                                INR 2,499
                                            </span>

                                        </div>

                                    </div>

                                    <div className="rounded-lg border border-slate-200 p-4">

                                        <div className="flex items-start justify-between">

                                            <div>

                                                <h4 className="font-semibold text-slate-900">
                                                    General Admission
                                                </h4>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Fast secure checkout
                                                </p>

                                            </div>

                                            <span className="text-sm font-semibold text-indigo-600">
                                                INR 799
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* Stats */}

                                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-5">

                                    <div>

                                        <p className="text-2xl font-bold text-slate-900">
                                            12k+
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Tickets sold
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-2xl font-bold text-slate-900">
                                            320+
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Events hosted
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-2xl font-bold text-slate-900">
                                            99%
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Secure payments
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>
                </div>
            </div>


            <div className="mx-auto max-w-[1200px] space-y-16 px-6 py-16">
                {/* Trust Strip */}

                <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">

                    <div className="grid gap-8 md:grid-cols-4">

                        <div className="flex items-start gap-4">

                            <div className="rounded-md bg-indigo-50 p-3 text-indigo-600">

                                <CalendarDays size={22} />

                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-900">
                                    500+ Events
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Hosted across multiple cities
                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-4">

                            <div className="rounded-md bg-indigo-50 p-3 text-indigo-600">

                                <Ticket size={22} />

                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-900">
                                    50k+ Tickets
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Smooth digital ticketing
                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-4">

                            <div className="rounded-md bg-indigo-50 p-3 text-indigo-600">

                                <ShieldCheck size={22} />

                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-900">
                                    Secure Payments
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Stripe-powered checkout
                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-4">

                            <div className="rounded-md bg-indigo-50 p-3 text-indigo-600">

                                <QrCode size={22} />

                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-900">
                                    QR Verification
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Instant ticket validation
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* Features */}

                <section>

                    <div className="max-w-2xl">

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">

                            Built for attendees, organizers, and admins.

                        </h2>

                        <p className="mt-4 text-lg text-slate-600">

                            Everything needed to manage modern event experiences from discovery to analytics.

                        </p>

                    </div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-3">

                        {/* Users */}

                        <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">

                            <div className="inline-flex rounded-md bg-indigo-50 p-3 text-indigo-600">

                                <Users size={24} />

                            </div>

                            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                For attendees
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">

                                Discover events, purchase tickets securely,
                                and receive QR-based digital access instantly.

                            </p>

                        </div>

                        {/* Organizers */}

                        <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">

                            <div className="inline-flex rounded-md bg-indigo-50 p-3 text-indigo-600">

                                <CalendarDays size={24} />

                            </div>

                            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                For organizers
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">

                                Create events, manage inventory,
                                track attendees, and monitor ticket sales easily.

                            </p>

                        </div>

                        {/* Admins */}

                        <div className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">

                            <div className="inline-flex rounded-md bg-indigo-50 p-3 text-indigo-600">

                                <BarChart3 size={24} />

                            </div>

                            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                For admins
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">

                                Manage platform operations, analytics,
                                users, events, and overall system performance.

                            </p>

                        </div>

                    </div>

                </section>

                {/* CTA Section */}

                <section className="rounded-lg bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-10">

                    <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

                        <div>

                            <h2 className="text-3xl font-bold tracking-tight text-white">

                                Ready to explore your next event?

                            </h2>

                            <p className="mt-4 max-w-2xl text-lg text-slate-300">

                                Join Evently to discover experiences,
                                host events, and simplify ticketing with secure digital access.

                            </p>

                        </div>

                        <div className="flex gap-4">

                            <Link
                                to="/events"
                                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >

                                Browse events

                            </Link>

                            <Link
                                to="/register"
                                className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                            >

                                Create account

                            </Link>

                        </div>

                    </div>

                </section>
            </div>

        </div >
    );
}