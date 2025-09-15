import User from "../models/userModel.js";

export async function findUserByEmail(email) {
  return await User.findOne({ email });
}


export async function createNewUser(userData) {
  return await User.create(userData);
}

export async function findUserByIdAndFilter(userId) {
  return await User.findById(userId).select("-password -refreshToken");
}


