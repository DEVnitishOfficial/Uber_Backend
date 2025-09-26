import express from 'express'
import userRouter from './user.router.js';
import bookingRouter from './booking.router.js';
import driverRouter from './driver.router.js';

const v1Router = express.Router();


v1Router.use('/user', userRouter)
v1Router.use('/booking', bookingRouter)
v1Router.use('/driver', driverRouter)


export default v1Router