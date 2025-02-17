import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
        Page Not Found
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back To Home
      </Link>
    </div>
  );
}
