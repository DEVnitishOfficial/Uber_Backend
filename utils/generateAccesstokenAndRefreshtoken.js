import { findUserForTokenGeneration } from "../repositories/user.repository.js";
import { InternalServerError, NotFoundError } from "./errorUtils.js";

export const generateAccesstokenAndRefreshtoken = async (userId) => {
  try {
    const user = await findUserForTokenGeneration(userId);
    if (!user) {
      throw new NotFoundError("User not found for token generation");
    }
    const accessToken = await user.generateJWTAccessToken();
    const refreshToken = await user.generateJWTRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new InternalServerError("Token generation failed", error.message);
  }
};