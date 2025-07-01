import express from "express";
import {
  getAllUser,
  getUserById,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import {
  loginSchema,
  registerSchema,
  joiValidator,
} from "../utils/validators.js";
import { notAllowed } from "../utils/notAllowed.js";
import { adminCheck, userCheck } from "../middleware/userCheck.js";

const router = express.Router();

router.route("/").get(userCheck, adminCheck, getAllUser).all(notAllowed);
router
  .route("/register")
  .post(joiValidator.body(registerSchema), registerUser)
  .all(notAllowed);

router
  .route("/login")
  .post(joiValidator.body(loginSchema), loginUser)
  .all(notAllowed);

router
  .route("/:id")
  .get(userCheck, getUserById)
  .post(userCheck)
  .all(notAllowed);

export default router;
