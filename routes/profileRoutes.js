import express from "express";
import { notAllowed } from "../utils/notAllowed.js";
import { userCheck } from "../middleware/userCheck.js";
import {
  getProfile,
  setProfile,
  updateProfile,
} from "../controllers/profileController.js";
import { fileCheck, updateFileCheck } from "../middleware/fileCheck.js";

const router = express.Router();

router
  .route("/")
  .post(userCheck, fileCheck, setProfile)
  .get(userCheck, getProfile)
  .patch(userCheck, updateFileCheck, updateProfile)
  .all(notAllowed);

export default router;
