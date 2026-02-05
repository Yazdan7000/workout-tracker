import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function EditWorkout() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const API_URL = "http://localhost:3000/api";

  // Fetch workout details and exercises
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1️⃣ Get workout
        const workoutRes = await fetch(`${API_URL}/workouts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!workoutRes.ok) throw new Error("Failed to fetch workout");
        const workoutData = await workoutRes.json();
        const w = workoutData.data?.[0];
        if (!w) throw new Error("Workout not found");

        setForm({
          title: w.title || "",
          description: w.description || "",
          duration: w.duration || "",
        });
        setSelectedExercises(w.exercises?.map((ex) => ex._id) || []);

        // 2️⃣ Get all exercises
        const exercisesRes = await fetch(`${API_URL}/exercises`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!exercisesRes.ok) throw new Error("Failed to fetch exercises");
        const exercisesData = await exercisesRes.json();
        setExercises(exercisesData.data || []);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleExerciseSelect = (exId) => {
    setSelectedExercises((prev) =>
      prev.includes(exId) ? prev.filter((id) => id !== exId) : [...prev, exId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.duration) return toast.error("Title and duration are required");

    setUpdating(true);
    try {
      const res = await fetch(`${API_URL}/workouts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          duration: Number(form.duration),
          exercises: selectedExercises,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update workout");

      toast.success("Workout updated successfully!");
      navigate(`/workouts/${id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Workout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Workout Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div>
          <h2 className="font-semibold mb-2">Select Exercises:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exercises.map((ex) => (
              <label
                key={ex._id}
                className="border p-2 rounded flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={selectedExercises.includes(ex._id)}
                  onChange={() => handleExerciseSelect(ex._id)}
                />
                <span>{ex.title}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Workout"}
        </button>
      </form>
    </div>
  );
}
