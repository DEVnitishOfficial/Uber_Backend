import { InternalServerError } from "../errorUtils.js";
import redisClient from "../redisClient.js";


export async function updateDriverLocInRedis(driverId, longitude, latitude){

   const updateDriverLoc =  await redisClient.sendCommand([
        "GEOADD",
        "uber_drivers",
        longitude.toString(),
        latitude.toString(),
        driverId.toString(),
    ])


    if(updateDriverLoc === null){
        throw new InternalServerError("Unable to update the driver location in redis")
    }

    return updateDriverLoc;
}