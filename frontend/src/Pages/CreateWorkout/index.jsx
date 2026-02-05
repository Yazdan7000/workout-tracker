import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateWorkout() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000/api";

  // Fetch all exercises
  useEffect(() => {
  const fetchExercises = async () => {
    try {
      const res = await fetch(`${API_URL}/exercises`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // اگر Backend آرایه مستقیم داده یا wrapped در data
      setExercises(Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to fetch exercises");
    }
  };
  fetchExercises();
}, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.duration) return toast.error("Title and duration required");

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/workouts`, {
        method: "POST",
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
      if (!res.ok) throw new Error(data.message || "Failed to create workout");

      toast.success("Workout created successfully!");
      navigate("/workouts");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseSelect = (id) => {
    setSelectedExercises((prev) =>
      prev.includes(id) ? prev.filter((ex) => ex !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Create Workout</h1>

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
              <label key={ex._id} className="border p-2 rounded flex items-center space-x-2">
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Workout"}
        </button>
      </form>
    </div>
  );
}
