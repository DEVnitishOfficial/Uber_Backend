import User from "../models/user.model.js"

export async function updateDriverLocInMongo(driverId, longitude, latitude){

    const location = {
        type : "Point",
        coordinates : [longitude, latitude]
    }

   return await User.findByIdAndUpdate(driverId, {location}, {new : true})
   
}