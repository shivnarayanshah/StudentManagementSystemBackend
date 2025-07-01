import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const server = express();

mongoose
  .connect(
    "mongodb+srv://shivnarayan2072:%40Kathmandu01@shivnarayan.daflsuv.mongodb.net/studentManagementSystem"
  )
  .then((val) => {
    server.listen(5000, () => {
      console.log(
        "Database is Connected server is listening at http://localhost:5000"
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);
server.use(express.static("uploads"));

server.use("/api/users", userRoutes);
server.use("/api/students", studentRoutes);
server.use("/api/profile", profileRoutes);

server.get("/", (req, res) => {
  return res.status(200).json("welcome to backend ");
});
