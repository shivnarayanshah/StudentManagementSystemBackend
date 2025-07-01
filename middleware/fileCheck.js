import { v4 as uuidv4 } from "uuid";

const valid_images = [
  "image/jpg",
  "image/png",
  "image/webp",
  "image/jpeg",
  "image/gif",
];

export const fileCheck = (req, res, next) => {
  const file = req.files?.image;

  if (!file) {
    return res.status(400).json({ message: "No file provided" });
  }

  if (!valid_images.includes(file?.mimetype)) {
    return res.status(400).json({ message: "Invalid Image type" });
  }

  const filePath = `/${uuidv4()}-${file?.name}`;

  file.mv(`./uploads/images${filePath}`, (err) => {
    if (err) return res.status(500).json({ message: err });
    if (!req.body) {
      req.body = {};
    }

    req.body.image = filePath;
    next();
  });
};

export const updateFileCheck = (req, res, next) => {
  const file = req.files?.image;
  if (!file) return next();
  if (!valid_images.includes(file?.mimetype)) {
    return res.status(500).json({ message: "Invalid Image" });
  }
  const filePath = `/${uuidv4()}-${file?.name}`;
  file.mv(`./uploads/images${filePath}`, (err) => {
    if (err) return res.status(200).json({ message: err });
    if (!req.body) {
      req.body = {};
    }
    req.body.image = filePath;
    next();
  });
};
