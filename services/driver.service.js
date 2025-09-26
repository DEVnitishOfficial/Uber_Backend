import { updateDriverLocInMongo } from "../repositories/driver.repository.js"
import { InternalServerError } from "../utils/errorUtils.js"
import { updateDriverLocInRedis } from "../utils/helpers/redis.service.js"

export async function updateDriverLocInRedisAndMongo(driverId, longitude, latitude){

     try {
   
       const [updatedRedisRes, updatedMongoRes] = await Promise.all([
               updateDriverLocInRedis(driverId, longitude, latitude),
               updateDriverLocInMongo(driverId, longitude, latitude)
       ])
   
       const result = {
           updatedRedisStatus : updatedRedisRes,
           updatedMongoStatus : updatedMongoRes
       }
   
       return result
       
     } catch (error) {
        throw new InternalServerError("Unable to update driver location in Redis and mongodb")
     }
    
}