import Router from "express";
import { loginValidator, registerValidator } from "./AuthValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import { login, register } from "./AuthCn.js";
const authRouter = Router();
authRouter
  .route("/register")
  .post(registerValidator, handleValidationErrors, register);
authRouter.route("/login").post(loginValidator, handleValidationErrors, login);

export default authRouter;
