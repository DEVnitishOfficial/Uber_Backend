import { StatusCodes } from "http-status-codes";
import { createUserService, loginUserService, refreshAccessTokenService } from "../services/user.service.js";


const options = {
  maxAge: 24 * 7 * 60 * 60 * 1000,
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


export async function refreshAccessTokenController(req, res){

  // const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
  const incomingRefreshToken = req.body.refreshToken;

  const { accessToken, refreshToken } = await refreshAccessTokenService(incomingRefreshToken);

  res.cookie("accessToken", accessToken, options)
  res.cookie("refreshToken", refreshToken, options)
  
  return res.status(StatusCodes.OK).json({
    success : true,
    message : "Access token refreshed successfully",
    data : {
      accessToken,
      refreshToken
    }
    });
};

