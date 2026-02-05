import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const API_URL = "http://localhost:3000/api";

  // Fetch workout details
  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/workouts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch workout");

        const data = await res.json();
        setWorkout(data.data?.[0] || null); // Backend structure
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id, token]);

  // Delete workout
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/workouts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete workout");

      toast.success("Workout deleted successfully!");
      navigate("/workouts");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!workout) return <p className="p-6">Workout not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{workout.title}</h1>
      <p className="text-gray-600 mb-4">{workout.description}</p>
      <p className="text-gray-500 mb-4">Duration: {workout.duration} min</p>

      <h2 className="text-2xl font-semibold mb-2">Exercises:</h2>
      {workout.exercises && workout.exercises.length > 0 ? (
        <ul className="list-disc pl-5 text-gray-600">
          {workout.exercises.map((ex, idx) => (
            <li key={idx}>{ex.title}</li>
          ))}
        </ul>
      ) : (
        <p>No exercises added yet.</p>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link
          to={`/workouts/${id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Update Workout
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Workout"}
        </button>

        <Link
          to="/workouts"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Workouts
        </Link>
      </div>
    </div>
  );
}
