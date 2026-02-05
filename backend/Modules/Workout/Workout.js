import Router from "express";
import {
  createWorkoutValidator,
  getAllWorkoutValidator,
  updateWorkoutValidator,
  workoutIdParam,
} from "./WorkoutValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import { create, getAll, getOne, remove, update } from "./WorkoutCn.js";

const workoutRouter = Router();

workoutRouter
  .route("/")
  .get(getAllWorkoutValidator, handleValidationErrors, getAll)
  .post(createWorkoutValidator, handleValidationErrors, create);
workoutRouter
  .route("/:id")
  .get(workoutIdParam, handleValidationErrors, getOne)
  .patch( updateWorkoutValidator, handleValidationErrors, update)
  .delete( workoutIdParam, handleValidationErrors, remove);

export default workoutRouter
