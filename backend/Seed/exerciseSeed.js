import mongoose from "mongoose";
import dotenv from "dotenv";
import Exercise from "../Modules/Exercise/ExerciseMd.js"; // مسیر ExerciseMd.js
dotenv.config();

// --- MongoDB Connection ---
const DB = process.env.DATA_BASE || "mongodb://localhost:27017/workout-tracker";

mongoose
  .connect(DB)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Seed Data ---
const exercises = [
  { title: "Push Ups", description: "Upper body exercise" },
  { title: "Squats", description: "Lower body exercise" },
  { title: "Plank", description: "Core strengthening" },
  { title: "Jumping Jacks", description: "Full body cardio" },
  { title: "Burpees", description: "Full body exercise" },
];

// --- Seed Function ---
const seedDB = async () => {
  try {
    // اختیاری: پاک کردن داده‌های قبلی
    // await Exercise.deleteMany({});

    // اضافه کردن داده‌ها
    const createdExercises = await Exercise.insertMany(exercises);
    console.log(`Exercises added: ${createdExercises.length}`);

    console.log("✅ Exercise seeding completed");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
