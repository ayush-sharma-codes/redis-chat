import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { messageWorker } from './workers/message.worker.js'
import { socketSetup } from './sockets/index.js'
import dotenv from 'dotenv'
import { connectMongo } from './config/mongo.js'
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
const server = createServer(app)
const io = new Server(server, {cors: {origin: '*'}})

const initialize = async () => {
  try {
    await connectMongo()
    messageWorker()
    await socketSetup(io)
    server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))
  } catch (error) {
    console.error(`Error while initialising setup: `, error)
  }
}

initialize()