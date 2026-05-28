import { Link, NavLink } from "react-router-dom";

export default function Navbar() {

    return (

        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">

            <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">

                {/* Brand */}

                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-slate-900"
                >
                    Evently
                </Link>

                {/* Navigation */}

                <nav className="hidden items-center gap-8 md:flex">

                    <NavLink
                        to="/events"
                        className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
                    >
                        Events
                    </NavLink>

                    <NavLink
                        to="/organizer"
                        className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
                    >
                        For organizers
                    </NavLink>

                </nav>

                {/* Actions */}

                <div className="flex items-center gap-3">

                    <Link
                        to="/login"
                        className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                        Get started
                    </Link>

                </div>

            </div>

        </header>
    );
}