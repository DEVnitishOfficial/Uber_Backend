
import { updateDriverLocInRedisAndMongo } from "../services/driver.service.js";
import { NotFoundError } from "../utils/errorUtils.js";

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
