import {
    Link,
    NavLink,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

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
                        className={({ isActive }) =>
                            `text-sm font-medium transition ${isActive
                                ? "text-indigo-600"
                                : "text-slate-600 hover:text-indigo-600"
                            }`
                        }
                    >
                        Events
                    </NavLink>

                    {user?.role === "ROLE_ORGANIZER" && (
                        <NavLink
                            to="/organizer"
                            className={({ isActive }) =>
                                `text-sm font-medium transition ${isActive
                                    ? "text-indigo-600"
                                    : "text-slate-600 hover:text-indigo-600"
                                }`
                            }
                        >
                            Organizer
                        </NavLink>
                    )}

                    {user?.role === "ROLE_ADMIN" && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `text-sm font-medium transition ${isActive
                                    ? "text-indigo-600"
                                    : "text-slate-600 hover:text-indigo-600"
                                }`
                            }
                        >
                            Admin
                        </NavLink>
                    )}

                    {user?.role === "ROLE_USER" && (
                        <NavLink
                            to="/tickets"
                            className={({ isActive }) =>
                                `text-sm font-medium transition ${isActive
                                    ? "text-indigo-600"
                                    : "text-slate-600 hover:text-indigo-600"
                                }`
                            }
                        >
                            My Tickets
                        </NavLink>
                    )}

                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">

                    {!user ? (
                        <>
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
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-700">
                                {user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}