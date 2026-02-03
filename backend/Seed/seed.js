import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Workout from "./../Modules/Workout/WorkoutMd.js"; // فرض بر اینه WorkoutMd.js داری
import User from "./../Modules/User/UserMd.js"; // فرض بر اینه UserMd.js داری

dotenv.config();

// --- MongoDB Connection ---
const DB = process.env.DATA_BASE || "mongodb://localhost:27017/workout-tracker";

mongoose
  .connect(DB)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Seed Data ---
const workouts = [
  { title: "Push Ups", description: "Upper body workout", duration: 15 },
  { title: "Squats", description: "Lower body workout", duration: 20 },
  { title: "Plank", description: "Core strengthening", duration: 5 },
  { title: "Jumping Jacks", description: "Cardio exercise", duration: 10 },
  { title: "Burpees", description: "Full body cardio", duration: 12 },
];

const adminUser = {
  fullName: "Admin User",
  userName: "Admin",
  role: "admin",
  isActive: true,
  password: bcrypt.hashSync("Admin@123", 10), // رمز پیش‌فرض
};

// --- Seed Function ---
const seedDB = async () => {
  try {
    // پاک کردن داده های قبلی (اختیاری)
    // await Workout.deleteMany({});
    // await User.deleteMany({});

    // اضافه کردن Workouts
    const createdWorkouts = await Workout.insertMany(workouts);
    console.log(`Workouts added: ${createdWorkouts.length}`);

    // اضافه کردن Admin
    const createdAdmin = await User.create(adminUser);

    console.log("✅ Database seeding completed");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
