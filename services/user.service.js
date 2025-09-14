import { createUser } from "../repositories/user.repository.js";

export async function createUserService(userData){
    const user = await createUser(userData)
    return user
}