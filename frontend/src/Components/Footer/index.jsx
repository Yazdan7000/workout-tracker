import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <p className="text-sm">
          © {year} <span className="text-white font-semibold">MyFitness</span>. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/workouts" className="hover:text-white transition">
            Workouts
          </Link>
          <Link to="/auth" className="hover:text-white transition">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
