import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import Exercise from "./../Modules/Exercise/ExerciseMd.js";
import Workout from "./../Modules/Workout/WorkoutMd.js";
import User from "./../Modules/User/UserMd.js";

dotenv.config();

// --- MongoDB Connection ---
const DB = process.env.DATA_BASE || "mongodb://localhost:27017/workout-tracker";

const seedDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(DB);
    console.log("✅ MongoDB connected");

    console.log("Deleting old data...");
    await Workout.deleteMany({});
    await User.deleteMany({});
    await Exercise.deleteMany({});
    console.log("Old data deleted");

    console.log("Seeding exercises...");
    const exercisesData = [
      { title: "Push Ups", description: "Upper body exercise" },
      { title: "Squats", description: "Lower body exercise" },
      { title: "Plank", description: "Core strengthening" },
      { title: "Jumping Jacks", description: "Full body cardio" },
      { title: "Burpees", description: "Full body exercise" },
    ];
    const createdExercises = await Exercise.insertMany(exercisesData);
    console.log(`✅ Exercises added: ${createdExercises.length}`);

    console.log("Seeding workouts...");
    const workouts = [
      { 
        title: "Push Ups", 
        description: "Upper body workout", 
        duration: 15,
        exercises: [createdExercises[0]._id]
      },
      { 
        title: "Squats", 
        description: "Lower body workout", 
        duration: 20,
        exercises: [createdExercises[1]._id]
      },
      { 
        title: "Plank", 
        description: "Core strengthening", 
        duration: 5,
        exercises: [createdExercises[2]._id]
      },
      { 
        title: "Jumping Jacks", 
        description: "Cardio exercise", 
        duration: 10,
        exercises: [createdExercises[3]._id]
      },
      { 
        title: "Burpees", 
        description: "Full body cardio", 
        duration: 12,
        exercises: [createdExercises[4]._id]
      },
    ];
    const createdWorkouts = await Workout.insertMany(workouts);
    console.log(`✅ Workouts added: ${createdWorkouts.length}`);

    console.log("Creating admin user...");
    const adminUser = {
      fullName: "Admin User",
      userName: "Admin",
      role: "admin",
      isActive: true,
      password: bcrypt.hashSync("Admin@123", 10),
    };
    const createdAdmin = await User.create(adminUser);
    console.log(`✅ Admin user created: ${createdAdmin.userName}`);

    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
