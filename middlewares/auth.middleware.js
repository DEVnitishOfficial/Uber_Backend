import { serverConfig } from "../config/index.js";
import User from "../models/user.model.js";
import { InternalServerError, UnauthorizedError } from "../utils/errorUtils.js";
import jwt from "jsonwebtoken";

export async function verifyJwt(req, _, next) {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("my token", token);

    if (!token) {
      throw new UnauthorizedError("Unauthorized request, invalid token");
    }

    const decodedToken = jwt.verify(
      token,
      serverConfig.ACCESS_JWT_TOKEN_SECRET
    );


    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new UnauthorizedError("Invalid access token");
    }

    req.userWithAccessToken = user;
    next();
  } catch (error) {
    throw new InternalServerError(
      "jwt verification failed",
      error?.message ||
        "something went wrong while creating jwtVerify middleware"
    );
  }
}
