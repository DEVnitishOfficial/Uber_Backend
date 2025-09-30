import { serverConfig } from "../config/index.js";
import { createBookingRepository, deleteBookingByIdRepository, findBookingByIdRepository, getAllBookingsRepository, updateBookingByIdRepository, updateBookingStatusRepository } from "../repositories/booking.repository.js";
import haversineDistance from "../utils/distance.js";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errorUtils.js";
import { findNearByDriverInRedisDB } from "../utils/helpers/redis.service.js";

export async function createBookingService(source, destination, passengerId) {
  const distance = haversineDistance(
    source.latitude,
    source.longitude,
    destination.latitude,
    destination.longitude 
  );

  if (distance <= 0) {
    throw new BadRequestError("Source and destination cannot be the same");
  }

  const fare = serverConfig.BASIC_FARE * (distance * serverConfig.RATE_PER_KM);

  if (fare <= 0 || isNaN(fare) || !fare) {
    throw new BadRequestError("Calculated fare is invalid");
  }

  const bookingData = {
    passanger: passengerId,
    source,
    destination,
    fare,
    distance,
  };

  const newBooking = await createBookingRepository(bookingData);

  if (!newBooking) {
    throw new InternalServerError("Booking creation failed, please try again");
  }
  return newBooking;
}

export async function findNearByDriverService(passangerLocation, radiusInKM){

    const longitude = passangerLocation.longitude
    const latitude = passangerLocation.latitude

    if(!longitude || !latitude || !radiusInKM){
      throw new NotFoundError("Every field longitude, latitude and radius required")
    }

    const nearByDriver = await findNearByDriverInRedisDB(longitude, latitude, radiusInKM);

    console.log('nearbydriver in service layer',nearByDriver);

    if(!nearByDriver){
      throw new NotFoundError("Nearby drivers not found")
    }

    return nearByDriver

}

export async function assignDriverToPassangerService(bookingId, driverId){

  const updatedBooking = await updateBookingStatusRepository(bookingId, driverId, "confirmed")

  
  if(!updatedBooking){
    throw new NotFoundError("Unable to update the booking status or already confirmed")
  }

  return updatedBooking
}


export async function getBookingByIdService(bookingId) {
  const booking = await findBookingByIdRepository(bookingId);
  if (!booking) {
    throw new NotFoundError("Booking not found with the given ID");
  }
  return booking;
}

export async function updateBookingByIdService(bookingId, updateInfo) {

  if (!bookingId || !updateInfo) {
    throw new BadRequestError("Invalid booking ID or update information");
  }

  const updatedBooking = await updateBookingByIdRepository(
    bookingId,
    updateInfo
  );

  if (!updatedBooking) {
    throw new InternalServerError("Booking update failed, please try again");
  }
  return updatedBooking;
}

export async function getAllBookingsService() {
  return await getAllBookingsRepository();
}

export async function deleteBookingByIdService(bookingId) {
  const deletedBooking = await deleteBookingByIdRepository(bookingId);
  if (!deletedBooking) {
    throw new NotFoundError("Booking not found with the given ID");
  }
  return deletedBooking;
}
