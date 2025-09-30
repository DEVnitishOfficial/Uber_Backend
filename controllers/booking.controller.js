import { StatusCodes } from "http-status-codes";
import { InternalServerError, NotFoundError } from "../utils/errorUtils.js";
import {
  createBookingService,
  deleteBookingByIdService,
  findNearByDriverService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingByIdService,
} from "../services/booking.service.js";
import { serverConfig } from "../config/index.js";
import axios from "axios";
import { storeNotifiedDriversInRedis } from "../utils/helpers/redis.service.js";

export async function createBookingController(req, res) {

  const { source, destination } = req.body;
  const passengerId = req.userWithAccessToken.id;

  const [bookingResponse, nearByDrivers] = await Promise.all([
    createBookingService(source, destination,passengerId),
    findNearByDriverService(source, serverConfig.RADIUS)
  ])

  const driverIds = nearByDrivers.map((indvDriver) => indvDriver[0])


        const rideInfo = {
            source,
            destination,
            passengerId,
            estimatedFare: bookingResponse.fare, 
            distance: bookingResponse.distance,
            pickupTime: new Date().toISOString()
        };


        const notificationResponse = await axios.post('http://localhost:3009/api/notify-drivers', {
                rideId:  bookingResponse._id.toString(),
                rideInfo,
                driverIds
            });


            await storeNotifiedDriversInRedis(bookingResponse._id, driverIds)


        if(!bookingResponse){
            throw new InternalServerError("Failed to create booking, please try again.")
        }

        if (!nearByDrivers || nearByDrivers.length === 0) {
            throw new NotFoundError('No drivers available near your location.');
        }

  return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Booking created and Notified nearby drivers successfully',
      data: {
        booking: bookingResponse,
        nearByDriversCount: nearByDrivers.length,
        driverNotificationResponse : notificationResponse.data.data
      },
    });
}

export async function getBookingByIdController(req, res) {
  const { id: bookingId } = req.params;
  const booking = await getBookingByIdService(bookingId);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Booking fetched successfully",
    data: booking,
  });
}

export async function updateBookingByIdController(req, res) {
  const { id: bookingId } = req.params;
  const updateInfo = req.body;
  const updatedBooking = await updateBookingByIdService(bookingId, updateInfo);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Booking updated successfully",
    data: updatedBooking,
  });
}

export async function getAllBookingsController(req, res) {
  const bookings = await getAllBookingsService();

  if (!bookings || bookings.length === 0) {
    throw new NotFoundError("No bookings found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Bookings fetched successfully",
    data: bookings,
  });
}

export async function deleteBookingByIdController(req, res) {
  const { id: bookingId } = req.params;

  if (!bookingId) {
    throw new NotFoundError("Booking ID is required");
  }

  const deletedBooking = await deleteBookingByIdService(bookingId);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Booking deleted successfully",
    data: deletedBooking,
  });
}
