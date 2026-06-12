import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function RegisterPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("ROLE_USER");
    const [loading, setLoading] = useState(false);

    function getRedirectPath(role) {
        switch (role) {
            case "ROLE_ADMIN": return "/admin";
            case "ROLE_ORGANIZER": return "/organizer";
            default: return "/events";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name");
            return;
        }
        if (!email.includes("@")) {
            toast.error("Please enter a valid email");
            return;
        }

        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            const data = await registerApi({ name, email, password, role });
            login(data);
            toast.success("Account created successfully!");
            navigate(getRedirectPath(data.role));

        } catch (err) {
            toast.error(err?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-[70vh] items-center justify-center">

            <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold text-slate-900">
                    Create account
                </h1>

                <p className="mt-2 text-slate-600">
                    Join Evently and start discovering events.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="text"
                            inputMode="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                            className="h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Register As
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-indigo-500"
                        >
                            <option value="ROLE_USER">User</option>
                            <option value="ROLE_ORGANIZER">Organizer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-indigo-600">
                        Sign in
                    </Link>
                </p>

            </div>

        </div>
    );
}