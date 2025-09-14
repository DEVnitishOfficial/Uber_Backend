
import express from 'express'
import { createUserSchema } from '../../dto/user.dto.js'
import { createUserController } from '../../controllers/user.controller.js'
import { validateRequestBody } from '../../middlewares/validator.middleware.js'


const userRouter = express.Router()


userRouter.post('/create', validateRequestBody(createUserSchema), createUserController)


export default userRouter;