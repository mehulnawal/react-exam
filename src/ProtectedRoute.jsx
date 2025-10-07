import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const { isLoggedIn } = useSelector((state) => state.userSlice);
    const storedUser = localStorage.getItem("user");

    // Allow if Redux says logged in OR user is in localStorage
    if (!isLoggedIn && !storedUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
