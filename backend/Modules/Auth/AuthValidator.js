import { body } from "express-validator";

export const registerValidator = [
  body("userName").notEmpty().withMessage("userName is required"),
  body("password").isLength({ min: 8 }).withMessage("password min 8 chars"),
  body("fullName").optional().isString().withMessage("fullName must be string"),
];

export const loginValidator = [
  body("userName").notEmpty().withMessage("userName is required"),
  body("password").notEmpty().withMessage("password is required"),
];
