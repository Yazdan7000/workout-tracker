import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function EditExercise() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const fetchExercise = async () => {
      const res = await fetch(`${API_URL}/exercises/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const ex = data.data?.[0];
      if (!ex) return toast.error("Exercise not found");
      setForm({ title: ex.title, description: ex.description });
      setLoading(false);
    };
    fetchExercise();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/exercises/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Exercise updated");
      navigate(`/exercises/${id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Exercise</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
