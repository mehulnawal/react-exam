import { Home, LogIn, PlusSquare } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router';

export const Navbar = () => {
    return (
        <>
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center h-16">

                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold text-gray-900 tracking-wider">
                                My Blog App
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">

                            <NavLink
                                to="/login"
                                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center"
                            >
                                <LogIn className="w-4 h-4 mr-1" />
                                Login
                            </NavLink>

                            <NavLink
                                to="/postList"
                                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center"
                            >
                                <Home className="w-4 h-4 mr-1" />
                                Posts List
                            </NavLink>

                            <NavLink
                                to="/create"
                                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center"
                            >
                                <PlusSquare className="w-4 h-4 mr-1" />
                                New Post
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav >

            <Outlet />
        </>
    );
};