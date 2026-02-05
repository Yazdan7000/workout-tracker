import Router from "express";
import {
  createExerciseValidator,
  exerciseIdParam,
  getAllExerciseValidator,
  updateExerciseValidator,
} from "./ExerciseValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import { create, getAll, getOne, remove, update } from "./ExerciseCn.js";

const exerciseRouter = Router();

exerciseRouter
  .route("/")
  .get(getAllExerciseValidator, handleValidationErrors, getAll)
  .post( createExerciseValidator, handleValidationErrors, create);
exerciseRouter
  .route("/:id")
  .get(exerciseIdParam, handleValidationErrors, getOne)
  .patch( updateExerciseValidator, handleValidationErrors, update)
  .delete( exerciseIdParam, handleValidationErrors, remove);

export default exerciseRouter
