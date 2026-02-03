import { body, param, query } from "express-validator";
import mongoose from "mongoose";

/* =========================
   helpers
========================= */

const isMongoId = (value) =>
  mongoose.Types.ObjectId.isValid(value);

/* =========================
   PARAMS
========================= */

export const workoutIdParam = [
  param("id")
    .notEmpty()
    .withMessage("workout id is required")
    .custom(isMongoId)
    .withMessage("Invalid workout id"),
];

/* =========================
   QUERY
========================= */

export const getAllWorkoutValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive number"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("limit must be a positive number"),

  query("search")
    .optional()
    .isString()
    .withMessage("search must be a string"),
];

/* =========================
   CREATE
========================= */

export const createWorkoutValidator = [
  body("title")
    .exists()
    .withMessage("title is required")
    .bail()
    .isString()
    .withMessage("title must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("title must be less than 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .trim(),

  body("duration")
    .exists()
    .withMessage("duration is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("duration must be a positive number"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];

/* =========================
   UPDATE
========================= */

export const updateWorkoutValidator = [
  ...workoutIdParam,

  body("title")
    .optional()
    .isString()
    .withMessage("title must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("title must be less than 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .trim(),

  body("duration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("duration must be a positive number"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];
