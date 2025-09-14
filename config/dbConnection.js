import mongoose from "mongoose";
import { serverConfig } from "./index.js";


const connectToDB = async () => {
    try{
        const {connection} = await mongoose.connect(serverConfig.MONGO_URI);
        
        if(connection){
            console.log(`connected to mongodb at : ${connection.host}`)
        }
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default connectToDB

