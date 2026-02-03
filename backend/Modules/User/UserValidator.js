import { body, param, query } from "express-validator";
import mongoose from "mongoose";

/* ---------- helpers ---------- */
const isMongoId = (value) =>
  mongoose.Types.ObjectId.isValid(value);

/* =========================================================
   PARAMS
========================================================= */

/* ---------- user id param ---------- */
export const userIdParam = [
  param("id")
    .notEmpty()
    .withMessage("user id is required")
    .bail()
    .custom(isMongoId)
    .withMessage("Invalid user id"),
];

/* =========================================================
   QUERY
========================================================= */

/* ---------- get all users ---------- */
export const getAllUserValidator = [
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
    .withMessage("search must be a string"),
];

/* =========================================================
   CREATE
========================================================= */

/* ---------- create user ---------- */
export const createUserValidator = [
  body("userName")
    .exists()
    .withMessage("userName is required")
    .bail()
    .isString()
    .withMessage("userName must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("userName must be between 3 and 50 characters"),

  body("password")
    .exists()
    .withMessage("password is required")
    .bail()
    .isString()
    .withMessage("password must be a string")
    .bail()
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),

  body("fullName")
    .optional()
    .isString()
    .withMessage("fullName must be a string")
    .isLength({ max: 100 })
    .withMessage("fullName must be less than 100 characters"),

  body("role")
    .optional()
    .isIn(["admin", "user", "superAdmin"])
    .withMessage("invalid role value"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];

/* =========================================================
   UPDATE
========================================================= */

/* ---------- update user ---------- */
export const updateUserValidator = [
  ...userIdParam,

  body("userName")
    .optional()
    .isString()
    .withMessage("userName must be a string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("userName must be between 3 and 50 characters"),

  body("fullName")
    .optional()
    .isString()
    .withMessage("fullName must be a string")
    .isLength({ max: 100 })
    .withMessage("fullName must be less than 100 characters"),

  body("role")
    .optional()
    .isIn(["admin", "user", "superAdmin"])
    .withMessage("invalid role value"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];

/* =========================================================
   CHANGE PASSWORD
========================================================= */

export const changePasswordValidator = [
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .bail()
    .isString()
    .withMessage("newPassword must be a string")
    .bail()
    .trim()
    .isLength({ min: 8 })
    .withMessage("newPassword must be at least 8 characters long"),

  body("oldPassword")
    .optional()
    .isString()
    .withMessage("oldPassword must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("oldPassword cannot be empty"),
];
