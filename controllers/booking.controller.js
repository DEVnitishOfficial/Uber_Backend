import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../utils/errorUtils.js";
import {
  createBookingService,
  deleteBookingByIdService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingByIdService,
} from "../services/booking.service.js";

export async function createBookingController(req, res) {
  const { source, destination } = req.body;
  const passengerId = req.userWithAccessToken.id;
  const bookingResponse = await createBookingService(
    source,
    destination,
    passengerId
  );
  if (!bookingResponse) {
    throw new NotFoundError("Booking creation failed");
  }
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Booking created successfully",
    data: bookingResponse,
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
