import { StatusCodes } from "http-status-codes";
import { createUserService } from "../services/user.service.js";


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
