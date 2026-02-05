import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Workouts() {
  const { token } = useSelector((state) => state.auth);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/workouts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch workouts");

        const data = await res.json();

        // اطمینان از آرایه بودن data
        setWorkouts(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Workouts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : workouts.length === 0 ? (
        <p>No workouts found. Create your first workout!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.map((w) => (
            <div
              key={w._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{w.title}</h2>
              <p className="text-gray-600 mb-4">{w.description}</p>
              <p className="text-gray-500 mb-2">Duration: {w.duration} min</p>
              <Link
                to={`/workouts/${w._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
