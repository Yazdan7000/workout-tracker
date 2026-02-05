import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { token, user } = useSelector((state) => state.auth);
  console.log("User token:", token);

  return (
    <div className="flex flex-col">

      {/* ================= HERO ================= */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome {user?.fullName || user?.userName || ""} 💪
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl">
          Track your workouts, manage exercises, and monitor your progress.
          Stay consistent and achieve your goals.
        </p>
        <Link
          to="/workouts"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          View Workouts
        </Link>
      </section>

      {/* ================= MAIN CARDS ================= */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Workouts</h2>
            <p className="text-gray-600 mb-4">
              Create workout plans, add exercises, and track your training.
            </p>
            <Link
              to="/workouts"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Workouts
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Exercises</h2>
            <p className="text-gray-600 mb-4">
              Browse available exercises used to build workout plans.
            </p>
            <Link
              to="/exercises"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              View Exercises
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose This App?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to stay consistent and track your fitness journey.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">🏋️ Workout Tracking</h3>
            <p className="text-gray-600">
              Easily add, edit and manage your workouts with full control.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">📈 Progress Focused</h3>
            <p className="text-gray-600">
              Stay motivated by tracking your consistency and improvement.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">🔐 Secure & Personal</h3>
            <p className="text-gray-600">
              Your workouts are private and tied only to your account.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 px-6 bg-black text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Fitness Journey?
        </h2>
        <p className="text-gray-300 mb-6">
          Consistency beats motivation. Start today and track your progress.
        </p>
        <Link
          to="/workouts"
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Go To Workouts
        </Link>
      </section>

      {/* ================= FOOTER INFO ================= */}
      <section className="py-6 text-center text-sm text-gray-400 bg-gray-100">
        Backend API with JWT Authentication • Workout CRUD • Reports
      </section>
    </div>
  );
}
