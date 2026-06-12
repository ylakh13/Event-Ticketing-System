import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        if (!email.includes("@")) {
            toast.error("Please enter a valid email");
            return;
        }

        if (!password.trim()) {
            toast.error("Please enter your password");
            return;
        }

        try {
            setLoading(true);

            const data = await loginApi({ email, password });
            login(data);
            toast.success("Welcome back!");
            navigate(getRedirectPath(data.role));

        } catch (err) {
            console.log("Login error:", err);
            console.log("Response:", err?.response);
            console.log("Message:", err?.response?.data?.message);
            toast.error(err?.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-[70vh] items-center justify-center">

            <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome back
                </h1>

                <p className="mt-2 text-slate-600">
                    Sign in to continue.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">

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
                            className="h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-indigo-600">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}