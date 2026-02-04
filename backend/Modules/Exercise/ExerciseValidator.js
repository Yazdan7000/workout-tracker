import { body, param, query } from "express-validator";
import mongoose from "mongoose";

/* ---------- helpers ---------- */
const isMongoId = (value) => mongoose.Types.ObjectId.isValid(value);

/* =========================================================
   PARAMS
========================================================= */
export const exerciseIdParam = [
  param("id")
    .notEmpty()
    .withMessage("exercise id is required")
    .custom(isMongoId)
    .withMessage("invalid exercise id"),
];

/* =========================================================
   QUERY
========================================================= */
export const getAllExerciseValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a number"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a number"),

  query("search")
    .optional()
    .isString()
    .withMessage("search must be string"),

  query("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];

/* =========================================================
   CREATE
========================================================= */
export const createExerciseValidator = [
  body("title")
    .exists()
    .withMessage("exercise title is required")
    .bail()
    .isString()
    .withMessage("exercise title must be string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("exercise title must be between 2 and 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be string")
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];

/* =========================================================
   UPDATE
========================================================= */
export const updateExerciseValidator = [
  ...exerciseIdParam,

  body("title")
    .optional()
    .isString()
    .withMessage("exercise title must be string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("exercise title must be between 2 and 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be string")
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];
