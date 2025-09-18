import Booking from "../models/booking.model.js";

export async function createBookingRepository(bookingData) {
  return await Booking.create(bookingData);
}

export async function findBookingByIdRepository(bookingId) {
  return await Booking.findById(bookingId);
}

export async function updateBookingByIdRepository(bookingId, updateInfo) {
  return await Booking.findByIdAndUpdate(bookingId, updateInfo, { new: true });
}

export async function getAllBookingsRepository() {
  return await Booking.find({});
}

export async function deleteBookingByIdRepository(bookingId) {
  return await Booking.findByIdAndDelete(bookingId);
}
