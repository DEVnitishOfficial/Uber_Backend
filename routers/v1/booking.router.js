
import express from 'express';
import { createBookingSchema, updateBookingSchema } from '../../dto/booking.dto.js';
import { createBookingController, deleteBookingByIdController, getAllBookingsController, getBookingByIdController, updateBookingByIdController } from '../../controllers/booking.controller.js';
import { validateRequestBody } from '../../middlewares/validator.middleware.js';
import { verifyJwt } from '../../middlewares/auth.middleware.js';



const bookingRouter = express.Router();

bookingRouter.post('/create', validateRequestBody(createBookingSchema), verifyJwt, createBookingController);
bookingRouter.get('/getById/:id', getBookingByIdController);
bookingRouter.put('/updateById/:id', validateRequestBody(updateBookingSchema), verifyJwt, updateBookingByIdController);
bookingRouter.get('/getAllBookings', getAllBookingsController);
bookingRouter.delete('/deleteById/:id', verifyJwt, deleteBookingByIdController);

export default bookingRouter;