import User from "../models/userModel.js";

export async function findUserForAuthentication(email) {
  return await User.findOne({ email }).select("+password +refereshToken");
}

export async function createNewUser(userData) {
  return await User.create(userData);
}

export async function findUserById(userId) {
  return await User.findById(userId);
}

export async function findUserForTokenGeneration(userId) {
  return await User.findById(userId).select("+password +refreshToken");
}



