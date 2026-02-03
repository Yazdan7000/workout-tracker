import mongoose from "mongoose";
const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title workout is required"],
      unique: [true, "title workout must be unique"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    duration: {
      type: Number,
      required: [true, "duration workout is required"],
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Workout = mongoose.model("Workout",workoutSchema)
export default Workout
