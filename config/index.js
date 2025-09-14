import dotenv from 'dotenv'

function loadEnv(){
    dotenv.config()
}

loadEnv()

 export const serverConfig = {
    PORT: Number(process.env.PORT) || 3005,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET || 'myjwtsecrexyzabcuberbackend',
    JWT_EXPIRY : process.env.JWT_EXPIRY || '24h'
}