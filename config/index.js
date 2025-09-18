import dotenv from 'dotenv'

function loadEnv(){
    dotenv.config()
}

loadEnv()

 export const serverConfig = {
    PORT: Number(process.env.PORT) || 3005,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_JWT_TOKEN_SECRET : process.env.ACCESS_JWT_TOKEN_SECRET || 'myjwtsecrexyzabcuberbackend',
    REFRESH_JWT_TOKEN_SECRET : process.env.REFRESH_JWT_TOKEN_SECRET || 'myjwtsecrexyzabcuberbackend',
    ACCESS_JWT_TOKEN_EXPIRY : process.env.ACCESS_JWT_TOKEN_EXPIRY || '24h',
    REFRESH_JWT_TOKEN_EXPIRY : process.env.REFRESH_JWT_TOKEN_EXPIRY || '7d',
    BASIC_FARE : process.env.BASIC_FARE || 50,
    RATE_PER_KM : process.env.RATE_PER_KM || 20
}