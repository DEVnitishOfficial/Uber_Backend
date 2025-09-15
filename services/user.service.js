import {
  findUserByEmail,
  createNewUser,
  findUserByIdAndFilter,
} from "../repositories/user.repository.js";

import { ConflictError, InternalServerError } from "../utils/errorUtils.js";

export async function createUserService(userData) {
  const { email } = userData;

  const userExist = await findUserByEmail(email);
  if (userExist) {
    throw new ConflictError("user already exist with the given mail id");
  }

  const user = await createNewUser(userData);
  if (!user) {
    throw new InternalServerError("User Registration failed, please try again");
  }

  const createdUser = await findUserByIdAndFilter(user._id);
  if (!createdUser) {
    throw new InternalServerError("Failed to retrieve and filter user data");
  }

  return createdUser;
}