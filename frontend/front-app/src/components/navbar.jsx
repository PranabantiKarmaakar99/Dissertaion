import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token"); // Check if user is authenticated

  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:text-blue-400">
          Abode
        </Link>

        {/* Links */}
        <div className="flex space-x-4">
            <Link to="/cart"
              className="px-4 py-2 bg-red-600 rounded hover:bg-violet-700">
                Cart
            </Link>
          {!token? (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Sign In
              </Link>
            </>
          ) : (
            <Link
              to="/signout"
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Sign Out
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
