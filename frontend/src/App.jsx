import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Workouts from "./Pages/Workouts";
import WorkoutDetails from "./Pages/WorkoutDetails";
import Auth from "./Pages/Auth";
import NotFound from "./Pages/NotFound";

export default function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to="/auth" replace />}
          />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetails />} />
          <Route
            path="/auth"
            element={isAuth ? <Navigate to="/" replace /> : <Auth />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Toaster position="top-right" />
      <Footer />
    </>
  );
}
