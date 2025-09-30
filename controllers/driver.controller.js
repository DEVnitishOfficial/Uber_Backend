
import axios from "axios";
import { assignDriverToPassangerService } from "../services/booking.service.js";
import { updateDriverLocInRedisAndMongo } from "../services/driver.service.js";
import { InternalServerError, NotFoundError } from "../utils/errorUtils.js";
import { getNearByNotifiedDriversFromRedis } from "../utils/helpers/redis.service.js";

export async function updateDriverLocationController(req, res) {

    const { latitude, longitude } = req.body;


    if (!latitude || !longitude) {
        throw new NotFoundError("Latitude and Longitude are required to update location");
    }

    const driverId = req.userWithAccessToken.id;

    const result = await updateDriverLocInRedisAndMongo(driverId, longitude, latitude)

    if(result.updatedRedisStatus != null && result.updatedMongoStatus){
       return res.status(200).json({
            success : true,
            message : "Driver location updated in Redis and mongoDb successfully",
            data : result
        })
    }
  
}

export async function confirmBookingByDriverController(req, res){

    const {bookingId} = req.body;
    const driverId = req.userWithAccessToken.id

   const updatedBookingAssignedDriver = await assignDriverToPassangerService(bookingId, driverId)

   const nearByNotifiedDriverIds =  await getNearByNotifiedDriversFromRedis(bookingId)

   try{
        const notificationResponse = await axios.post('http://localhost:3009/api/remove-ride-notification', {
            rideId: bookingId,
            driverIds: nearByNotifiedDriverIds
        });

        if(!notificationResponse){
            throw new InternalServerError("Unable to complete the remove-ride-notification api call")
        }
    console.log('Successfully removed ride notifications:', notificationResponse.data);
   }catch(error){
    console.log("something went wrong while making remove ride notification api call from backend",error.message)
   }
    

     res.status(201).send({
        success : true,
        message : "Booking confirmed by drivers successfully",
        data : updatedBookingAssignedDriver
    })

}
