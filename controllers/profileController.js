import UserProfile from "../models/userProfileModel.js";
import fs from "fs";
export const getProfile = async (req, res) => {
  const id = req.id;
  try {
    const profile = await UserProfile.findOne({ userId: id });
    if (!profile) return res.status(200).json(null);
    return res.status(200).json({ profile: profile.image, userID: id });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

export const setProfile = async (req, res) => {
  const id = req.id;
  const { image } = req.body;

  try {
    const isExist = await UserProfile.find({ userId: id });

    if (isExist.length <= 0) {
      await UserProfile.create({
        userId: req.id,
        image,
      });
      return res.status(200).json({ message: "Profile Uploaded Successfully" });
    } else {
      throw new Error(
        "cant upload more than one image you can update the existing one "
      );
    }
  } catch (error) {
    fs.unlink(`./uploads/images${image}`, (err) => {
      if (err) return res.status(500).json({ error: `${err}` });
      return res.status(500).json({ message: `${error}` });
    });
  }
};

export const updateProfile = async (req, res) => {
  const id = req.id;
  const { image } = req.body;
  try {
    const profile = await UserProfile.findOne({ userId: id });
    if (!profile) return res.status(400).json({ message: "Profile not exist" });
    if (image)
      fs.unlink(`./uploads/images${profile.image}`, (err) => {
        if (err)
          return res
            .status(400)
            .json({ messgage: `error deleting file from server ${err}` });
      });
    profile.image = image || profile.image;
    await profile.save();
    return res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
};
