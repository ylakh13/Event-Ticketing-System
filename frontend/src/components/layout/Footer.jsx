import { Link } from "react-router-dom";

export default function Footer() {

    return (

        <footer className="border-t border-slate-200 bg-white">

            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">

                {/* Brand */}

                <div className="max-w-sm">

                    <h2 className="text-xl font-bold text-slate-900">
                        Evently
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        Modern event ticketing platform for discovering,
                        managing, and selling unforgettable experiences.
                    </p>

                </div>

                {/* Links */}

                <div className="flex gap-16">

                    <div>

                        <h3 className="mb-4 text-sm font-semibold text-slate-900">
                            Platform
                        </h3>

                        <div className="space-y-3 text-sm text-slate-600">

                            <Link
                                to="/events"
                                className="block transition hover:text-indigo-600"
                            >
                                Events
                            </Link>

                            <Link
                                to="/organizer"
                                className="block transition hover:text-indigo-600"
                            >
                                Organizers
                            </Link>

                        </div>

                    </div>

                    <div>

                        <h3 className="mb-4 text-sm font-semibold text-slate-900">
                            Account
                        </h3>

                        <div className="space-y-3 text-sm text-slate-600">

                            <Link
                                to="/login"
                                className="block transition hover:text-indigo-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="block transition hover:text-indigo-600"
                            >
                                Register
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom */}

            <div className="border-t border-slate-200">

                <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 text-sm text-slate-500">

                    <p>
                        Copyright 2026 Evently. All rights reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
}