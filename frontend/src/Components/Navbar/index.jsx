import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/AuthSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:opacity-80">
        MyFitness
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/workouts" className="hover:underline">
          Workouts
        </Link>

        {isAuth ? (
          <>
            <span className="font-semibold">
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
    </nav>
  );
}
