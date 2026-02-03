import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "username already exist"],
    trim:true,
    required: [true, "username number is required"],
    lowercase:true
  },
  password: {
    type: String,
    required:[true,"password user is required"],
    select:false
  },
  fullName: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["admin", "user", "superAdmin"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
},{timestamps:true});
const User=mongoose.model('User',userSchema)
export default User
