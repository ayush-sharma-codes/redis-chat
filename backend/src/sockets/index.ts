import { Server, Socket } from 'socket.io'
import { chatHandlers } from './socket.handler'
import { createAdapter } from '@socket.io/redis-adapter'
import { pubClient, subClient } from '../config/redis'


export const socketSetup = async (io: Server) => {
  io.adapter(createAdapter(pubClient, subClient))
  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket}`)
    chatHandlers(io, socket)
  })
}