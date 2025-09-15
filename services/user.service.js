import {
  findUserForAuthentication,
  createNewUser,
  findUserById,
  findUserForTokenGeneration,
} from "../repositories/user.repository.js";

import { ConflictError, InternalServerError, NotFoundError, BadRequestError, UnauthorizedError } from "../utils/errorUtils.js";


const generateAccesstokenAndRefreshtoken = async (userId) => {
  try {
    const user = await findUserForTokenGeneration(userId);
    if (!user) {
      throw new NotFoundError("User not found for token generation");
    }
    const accessToken = user.generateJWTAccessToken();
    const refreshToken = user.generateJWTRefreshToken();


    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new InternalServerError("Token generation failed", error.message);
  }
};

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
