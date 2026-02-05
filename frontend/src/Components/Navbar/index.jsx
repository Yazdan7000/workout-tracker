import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/AuthSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, user } = useSelector((state) => state.auth);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <nav
      className={`fixed w-full z-50 top-0 left-0 transition-all backdrop-blur-md ${
        scrolled ? "bg-black/80 shadow-md" : "bg-black/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white hover:opacity-80">
          MyFitness
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition"
          >
            Home
          </Link>
          <Link
            to="/workouts"
            className="text-white hover:text-gray-300 transition"
          >
            Workouts
          </Link>
          <Link
            to="/exercises"
            className="text-white hover:text-gray-300 transition"
          >
            Exercises
          </Link>

          {isAuth ? (
            <>
              <span className="text-white font-semibold">
                {user?.fullName || user?.userName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
