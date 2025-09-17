
import express from 'express'
import { createUserSchema, loginUserSchema } from '../../dto/user.dto.js'
import { createUserController, loginUserController, refreshAccessTokenController } from '../../controllers/user.controller.js'
import { validateRequestBody } from '../../middlewares/validator.middleware.js'


const userRouter = express.Router()


userRouter.post('/create', validateRequestBody(createUserSchema), createUserController)
userRouter.post('/login', validateRequestBody(loginUserSchema), loginUserController)
userRouter.post('/refresh-access-token', refreshAccessTokenController)


export default userRouter;