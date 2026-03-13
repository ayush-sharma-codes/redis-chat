import { Socket, Server } from 'socket.io'

import { type ChatMessage, incomingMessageHandler } from '../services/chatService.js'

export const chatHandlers = async (io: Server, socket: Socket) => {
    socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId)
  })
  socket.on('sendMessage', async (payload: ChatMessage) => {
    await incomingMessageHandler(io, payload)
  })
}