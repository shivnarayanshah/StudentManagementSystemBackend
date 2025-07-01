import Joi from "joi";
import { createValidator } from "express-joi-validation";

export const joiValidator = createValidator({});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const registerSchema = Joi.object({
  username: Joi.string().min(4).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

export const addStudentSchema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(1).max(200).required(),
  course: Joi.string().min(2).max(40).required(),
});
