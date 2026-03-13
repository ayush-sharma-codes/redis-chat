import { Server, Socket } from 'socket.io'
import { chatHandlers } from './socket.handler.js'
import { createAdapter } from '@socket.io/redis-adapter'
import { pubClient, subClient } from '../config/redis.js'


export const socketSetup = async (io: Server) => {
  io.adapter(createAdapter(pubClient, subClient))
  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`)
    chatHandlers(io, socket)
  })
}