import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt, { compareSync } from "bcrypt";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(200).json({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: `${error}` });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        message: "User already exist. Please try register with unique gmail.",
      });
    }
    const pwd = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: pwd,
    });
    return res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not find please register" });
    }
    const pwd = await bcrypt.compare(password, user.password);
    if (!pwd) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "secretKey"
    );
    return res.status(200).json({
      id: user.id,
      token,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: `User doesn't exist` });

    return res.status(200).json({
      role: user.role,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};
