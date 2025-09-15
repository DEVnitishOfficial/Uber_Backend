import { StatusCodes } from "http-status-codes";
import { createUserService, loginUserService } from "../services/user.service.js";


const cookieOptions = {
  maxAge: 24 * 7 * 60 * 60 * 1000, // 7 day
  httpOnly: true,
  secure: true,
};

export async function createUserController(req, res) {

  const userResponse = await createUserService(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: userResponse,
  });

}

export async function loginUserController(req, res) {

  const {loggedInUser, accessToken, refreshToken} = await loginUserService(req.body)

    const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("accessJWTToken", accessToken, options);
  res.cookie("refreshJWTToken", refreshToken, options);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: loggedInUser,
      accessToken,
      refreshToken
    },
  });
}