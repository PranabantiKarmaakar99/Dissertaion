import React from "react";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken"); // Remove token from local storage
    console.log("Signed out successfully!");
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <div className="text-center flex justify-center items-center">
    <button
      onClick={handleSignOut}
      className="bg-red-600 text-white  px-4 py-2 rounded-lg hover:bg-red-700"
    >
      Sign Out
    </button>
    </div>
  );
};

export default SignOutButton;
