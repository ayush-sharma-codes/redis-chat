import { Socket, Server } from 'socket.io'

import { ChatMessage, incomingMessageHandler } from '../services/chatService'

export const chatHandlers = async (io: Server, socket: Socket) => {
    socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId)
  })
  socket.on('sendMessage', async (payload: ChatMessage) => {
    await incomingMessageHandler(io, payload)
  })
}