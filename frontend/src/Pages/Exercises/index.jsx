import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Exercises() {
  const { token } = useSelector((state) => state.auth);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/exercises`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setExercises(data.data || []);
      } catch (err) {
        toast.error("Failed to fetch exercises");
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [token]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exercises</h1>
        <Link
          to="/exercises/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Exercise
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exercises.map((ex) => (
          <div
            key={ex._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{ex.title}</h2>
            <p className="text-gray-600 mb-4">{ex.description || "No description"}</p>

            <Link
              to={`/exercises/${ex._id}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
