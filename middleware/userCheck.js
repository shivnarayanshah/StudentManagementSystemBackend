import jwt from "jsonwebtoken";

export const userCheck = (req, res, next) => {
  const token = req.headers?.authorization;

  const decode = jwt.decode(token, "secretKey");
  if (!decode) {
    return res.status(401).json({ message: "unAuthorized Access" });
  }
  req.role = decode.role;
  req.id = decode.id;

  return next();
};

export const adminCheck = (req, res, next) => {
  if (req.role !== "admin") {
    return res
      .status(401)
      .json({ message: "unAuthorized Access only Admin is Authorized" });
  }
  return next();
};
