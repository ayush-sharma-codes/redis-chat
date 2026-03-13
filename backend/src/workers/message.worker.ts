import { dataClient } from "../config/redis.js";
import { insertBulk } from "../repository/message.repository.js";
import { REDIS_QUEUE_KEY } from "../services/chatService.js";
import dotenv from 'dotenv'
dotenv.config()

const BATCH_SIZE = process.env.BATCH_SIZE || 1000
const INTERVAL = process.env.INTERVAL || 2000

const processQueue = async () => {
  try {
    const messages = await dataClient.lpop(REDIS_QUEUE_KEY, BATCH_SIZE)
    if (messages && messages.length > 0) {
      const parsedMessages = messages.map((msg) => JSON.parse(msg))
      await insertBulk(parsedMessages)
      console.log(`Inserted ${parsedMessages.length} messages into DB`)
    }
  } catch (error) {
    console.error(`Error occurred while processing queue: `, error)
  }
}

export const messageWorker = () => {
  console.log(`Starting message queue worker....`)
  setInterval(processQueue, Number(INTERVAL))
}