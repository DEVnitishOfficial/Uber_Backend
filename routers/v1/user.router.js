
import express from 'express'
import { createUserSchema, loginUserSchema, userUpdateSchema } from '../../dto/user.dto.js'
import { createUserController, deleteUserController, getAllUsersController, loginUserController, refreshAccessTokenController, updateUserController } from '../../controllers/user.controller.js'
import { validateRequestBody } from '../../middlewares/validator.middleware.js'


const userRouter = express.Router()


userRouter.post('/create', validateRequestBody(createUserSchema), createUserController)
userRouter.post('/login', validateRequestBody(loginUserSchema), loginUserController)
userRouter.post('/refresh-access-token', refreshAccessTokenController)
userRouter.get('/all', getAllUsersController)
userRouter.put('/update/:id', validateRequestBody(userUpdateSchema), updateUserController)
userRouter.delete('/delete/:id', deleteUserController)

export default userRouter;