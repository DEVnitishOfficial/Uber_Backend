import User from "../models/userModel.js";
import { ConflictError, InternalServerError } from "../utils/errorUtils.js";

export async function createUser(userData) {

  const{userName, email, password} = userData
  console.log('userdata', userData, 'uname',userName, 'email>>',email, 'pass',password)

  const userExist = await User.findOne({email});
console.log('userExist>>>', userExist);
  if (userExist) {
    throw new ConflictError("user already exist with the given mail id");
  }

  const user = await User.create({
    userName,
    email,
    password,
  });

  if (!user) {
    throw new InternalServerError("User Registrantion failed, please try agian");
  }

  await user.save();
  user.password = undefined;

  return user;
}


