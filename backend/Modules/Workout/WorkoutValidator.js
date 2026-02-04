import { body, param, query } from "express-validator";
import mongoose from "mongoose";

/* =========================
   helpers
========================= */

const isMongoId = (value) => mongoose.Types.ObjectId.isValid(value);

/* =========================
   PARAMS
========================= */

export const workoutIdParam = [
  param("id")
    .notEmpty()
    .withMessage("Workout id is required")
    .bail()
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
    .withMessage("Page must be a positive number"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive number"),

  query("search")
    .optional()
    .isString()
    .withMessage("Search must be a string"),
];

/* =========================
   CREATE
========================= */

export const createWorkoutValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  body("duration")
    .exists()
    .withMessage("Duration is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive number"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  body("exercises")
    .optional()
    .isArray()
    .withMessage("Exercises must be an array of ObjectId")
    .bail()
    .custom((arr) => arr.every(isMongoId))
    .withMessage("Each exercise must be a valid MongoId"),
];

/* =========================
   UPDATE
========================= */

export const updateWorkoutValidator = [
  ...workoutIdParam,

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim(),

  body("duration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive number"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  body("exercises")
    .optional()
    .isArray()
    .withMessage("Exercises must be an array of ObjectId")
    .bail()
    .custom((arr) => arr.every(isMongoId))
    .withMessage("Each exercise must be a valid MongoId"),
];
