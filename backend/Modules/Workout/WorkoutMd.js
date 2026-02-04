import mongoose from "mongoose";
const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title workout is required"],
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
    exercises: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
        },
      ],
      default:[]
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
