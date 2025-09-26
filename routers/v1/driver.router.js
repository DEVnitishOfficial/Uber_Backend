
import express from 'express'
import { updateDriverLocationController } from '../../controllers/driver.controller.js';
import { verifyJwt } from '../../middlewares/auth.middleware.js';
import { validateRequestBody } from '../../middlewares/validator.middleware.js';
import { userUpdateSchema } from '../../dto/user.dto.js';

const driverRouter = express.Router()

driverRouter.post("/updateLocation", verifyJwt, validateRequestBody(userUpdateSchema), updateDriverLocationController )


export default driverRouter;
