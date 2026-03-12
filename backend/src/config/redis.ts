import { Redis } from 'ioredis'
import dotenv from 'dotenv'
dotenv.config()

const REDIS_URI = process.env.REDIS_URI || `redis://localhost:6379`

export const pubClient = new Redis(REDIS_URI)
export const subClient = pubClient.duplicate()
export const dataClient = new Redis(REDIS_URI)

pubClient.on("error", (err) => console.log(`Error occurred in redis pub client: `, err))
subClient.on("error", (err) => console.log(`Error occurred in redis sub client: `, err))
dataClient.on("error", (err) => console.log(`Error occurred in redis data client: `, err))