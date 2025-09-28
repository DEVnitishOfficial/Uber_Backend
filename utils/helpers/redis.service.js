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

export async function findNearByDriverInRedisDB(longitude, latitude, radiusInKM){
    const nearbyDrivers = await redisClient.sendCommand([
        'GEORADIUS',
        'uber_drivers',
        longitude.toString(),
        latitude.toString(),
        radiusInKM.toString(),
        'km',
        'WITHCOORD'
    ]);

    if(nearbyDrivers === null || undefined){
        throw new InternalServerError("unable to find the nearby drivers in redis db")
    }

    return nearbyDrivers
}

// store notified driver for particular booking id, here bookingId is used only as key
export async function storeNotifiedDriversInRedis(bookingId, driverIds){

        for (const driverId of driverIds) {
          const addedCount = await redisClient.sAdd(`Notified_Drivers:${bookingId}`, driverId);
          // sAdd : create a unique set with the name of "Notified_Drivers" and store the unique driverId
          console.log(`Added driver with driverId: ${driverId} in redis for bookingId ${bookingId}, count of uniqe driverId: ${addedCount}`);
          return addedCount
        }
}

// redis sMembers return all the unique items which is stored under a unique key.
export async function getNearByNotifiedDriversFromRedis(bookingId){
    const nearbyDrivers = await redisClient.sMembers(`Notified_Drivers:${bookingId}`);
    return nearbyDrivers;
}