import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ExerciseDetails() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const API_URL = "http://localhost:3000/api";

  // Fetch exercise details
  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/exercises/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch exercise");

        const data = await res.json();
        setExercise(data.data?.[0] || null); // same backend structure
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id, token]);

  // Delete exercise
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this exercise?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/exercises/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete exercise");

      toast.success("Exercise deleted successfully!");
      navigate("/exercises");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!exercise) return <p className="p-6">Exercise not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{exercise.title}</h1>

      <p className="text-gray-600 mb-4">
        {exercise.description || "No description provided."}
      </p>

      {/* Optional fields if exist */}
      {exercise.duration && (
        <p className="text-gray-500 mb-2">
          Duration: {exercise.duration} min
        </p>
      )}

      {exercise.reps && (
        <p className="text-gray-500 mb-2">Reps: {exercise.reps}</p>
      )}

      {exercise.sets && (
        <p className="text-gray-500 mb-4">Sets: {exercise.sets}</p>
      )}

      {/* Action Buttons (same style as WorkoutDetails) */}
      <div className="mt-6 flex space-x-4">
        <Link
          to={`/exercises/${id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Update Exercise
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Exercise"}
        </button>

        <Link
          to="/exercises"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Exercises
        </Link>
      </div>
    </div>
  );
}
