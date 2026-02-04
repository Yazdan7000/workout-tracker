import mongoose from "mongoose";
const exerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "exercise title is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;
