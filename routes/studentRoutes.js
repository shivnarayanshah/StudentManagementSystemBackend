import express from "express";
import {
  addStudent,
  deleteSingleStudent,
  getAllStudents,
  getPaginatedStudents,
  getSingleStudent,
  getStudentByEmail,
  updateStudent,
} from "../controllers/studentController.js";

import { notAllowed } from "../utils/notAllowed.js";
import { addStudentSchema, joiValidator } from "../utils/validators.js";
import { adminCheck, userCheck } from "../middleware/userCheck.js";

const router = express.Router();

// All students - GET, POST
router
  .route("/")
  .get(userCheck, adminCheck, getAllStudents)
  .post(joiValidator.body(addStudentSchema), userCheck, adminCheck, addStudent)
  .all(notAllowed);

// PAGINATED STUDENTS ROUTE TO GET STUDENTS
router
  .route("/paginated")
  .get(userCheck, adminCheck, getPaginatedStudents)
  .all(notAllowed);

// GET STUDENT BY EMAIL
router.route("/email/:email").get(userCheck, getStudentByEmail).all(notAllowed);

// Single student - GET, PATCH, DELETE
router
  .route("/:id")
  .get(userCheck, getSingleStudent)
  .patch(userCheck, adminCheck, updateStudent)
  .delete(userCheck, adminCheck, deleteSingleStudent)
  .all(notAllowed);

export default router;
