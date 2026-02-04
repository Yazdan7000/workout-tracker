import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Oops! Page Not Found</h2>
      <p className="mb-6 text-center text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
