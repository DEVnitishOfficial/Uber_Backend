import jwt, { decode } from 'jsonwebtoken'
import {
  findUserForAuthentication,
  createNewUser,
  findUserById,
  findUserForTokenGeneration,
} from "../repositories/user.repository.js";

import { ConflictError, InternalServerError, NotFoundError, BadRequestError, UnauthorizedError } from "../utils/errorUtils.js";
import { serverConfig } from '../config/index.js';
import { generateAccesstokenAndRefreshtoken } from '../utils/generateAccesstokenAndRefreshtoken.js';

export async function createUserService(userData) {
  const { email } = userData;

  const userExist = await findUserForAuthentication(email);
  if (userExist) {
    throw new ConflictError("user already exist with the given mail id");
  }

  const user = await createNewUser(userData);
  if (!user) {
    throw new InternalServerError("User Registration failed, please try again");
  }

  const createdUser = await findUserById(user._id);
  if (!createdUser) {
    throw new InternalServerError("Failed to retrieve and filter user data");
  }

  return createdUser;
}

export async function loginUserService(userData){

    const {email, password} = userData

    if(!email || !password){
        throw new BadRequestError("email and password are required")
    }

    const user = await findUserForAuthentication(email)


    if(!user){
        throw new NotFoundError("user does not exist with the given email")
    }

    const passwordMatch = await user.isPasswordCorrect(password)
    if(!passwordMatch){
        throw new UnauthorizedError("entered password is not correct")
    }

    const {accessToken, refreshToken} = await generateAccesstokenAndRefreshtoken(user._id)

    const loggedInUser = await findUserById(user._id)
    if(!loggedInUser){
        throw new InternalServerError("Failed to retrieve and filter user data")
    }
    return {loggedInUser, accessToken, refreshToken};

}

export async function refreshAccessTokenService(IncomingRefreshToken) {
  if (!IncomingRefreshToken) {
    throw new UnauthorizedError("Unauthorised request, incorrect refresh token");
  }

  const decodedToken = jwt.verify(IncomingRefreshToken, serverConfig.REFRESH_JWT_TOKEN_SECRET);
  if (!decodedToken || !decodedToken.id) {
      throw new UnauthorizedError("Invalid refresh token");
  }

  const user = await findUserForTokenGeneration(decodedToken.id);
  if (!user) {
    throw new UnauthorizedError("Invalid refresh token, unable to find user");
  }

  // Check if the incoming token matches the one in the database
  if (IncomingRefreshToken !== user.refreshToken) {
    throw new UnauthorizedError("Refresh token either expired or used");
  }
  
  const {accessToken, refreshToken} = await generateAccesstokenAndRefreshtoken(user.id)
 
  return {accessToken, refreshToken}
}

