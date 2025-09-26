
import redis from 'redis'

const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('connected to redis');
})

redisClient.on('error', (error) => {
    console.log('redis connection error',error.message)
})

redisClient.connect();

export default redisClient;