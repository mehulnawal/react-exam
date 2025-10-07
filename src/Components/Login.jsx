import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "./Slice/usersSlice";
import { useNavigate } from "react-router-dom";

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.userSlice);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (success) {
            setEmail("");
            setPassword("");
            setTimeout(() => {
                dispatch(resetState());
                navigate("/postList");
            }, 1000);
        }
    }, [success, dispatch, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl shadow-2xl space-y-5 w-full max-w-md border-2 border-indigo-100"
            >
                <h2 className="text-3xl font-extrabold text-indigo-600 text-center mb-6">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-2.5 placeholder-gray-500 text-gray-900"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-2.5 placeholder-gray-500 text-gray-900"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                    {loading ? "Saving..." : "Login"}
                </button>

                {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                {success && <p className="mt-4 text-center text-green-600">{success}</p>}
            </form>
        </div>
    );
}
