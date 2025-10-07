import { Home, LogOut, PlusSquare } from "lucide-react";
import { Link, NavLink, Outlet } from 'react-router';

// Enhanced Navbar Component
export const Navbar = () => {
    const baseClasses = "text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:bg-indigo-50";
    const activeClasses = "bg-indigo-100 text-indigo-700 shadow-sm";

    return (
        <>
            <nav className="bg-gradient-to-r from-white to-gray-50 shadow-lg border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0">
                            <Link
                                to="/"
                                className="text-3xl font-bold text-indigo-600"
                            >
                                My Blog
                            </Link>
                        </div>

                        <div className="flex items-center space-x-2">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `${baseClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Posts</span>
                            </NavLink>

                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `${baseClasses} ${isActive ? activeClasses : ""}`
                                }
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
                <Outlet />
            </div>
        </>
    );
};
