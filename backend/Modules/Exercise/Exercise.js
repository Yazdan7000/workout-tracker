import Router from "express";
import {
  createExerciseValidator,
  exerciseIdParam,
  getAllExerciseValidator,
  updateExerciseValidator,
} from "./ExerciseValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import { create, getAll, getOne, remove, update } from "./ExerciseCn.js";
import isAdmin from "../../Middlewares/isAdmin.js";
const exerciseRouter = Router();

exerciseRouter
  .route("/")
  .get(getAllExerciseValidator, handleValidationErrors, getAll)
  .post(isAdmin, createExerciseValidator, handleValidationErrors, create);
exerciseRouter
  .route("/:id")
  .get(exerciseIdParam, handleValidationErrors, getOne)
  .patch(isAdmin, updateExerciseValidator, handleValidationErrors, update)
  .delete(isAdmin, exerciseIdParam, handleValidationErrors, remove);

export default exerciseRouter
