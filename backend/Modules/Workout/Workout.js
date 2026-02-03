import Router from "express";
import {
  createWorkoutValidator,
  getAllWorkoutValidator,
  updateWorkoutValidator,
  workoutIdParam,
} from "./WorkoutValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import { create, getAll, getOne, remove, update } from "./WorkoutCn.js";
import isAdmin from "./../../Middlewares/isAdmin.js";

const workoutRouter = Router();

workoutRouter
  .route("/")
  .get(getAllWorkoutValidator, handleValidationErrors, getAll)
  .post(isAdmin, createWorkoutValidator, handleValidationErrors, create);
workoutRouter
  .route("/:id")
  .get(workoutIdParam, handleValidationErrors, getOne)
  .patch(isAdmin, updateWorkoutValidator, handleValidationErrors, update)
  .delete(isAdmin, workoutIdParam, handleValidationErrors, remove);

export default workoutRouter
