import { Server } from 'socket.io'
import { dataClient } from '../config/redis'

export interface ChatMessage {
  senderId: string;
  roomId: string,
  content: string;
}

export const REDIS_QUEUE_KEY = `chat:message_buffer`

export const incomingMessageHandler = async (io: Server, payload: ChatMessage) => {
  const messageWithTime = {
    ...payload,
    timestamp: new Date().toISOString()
  }
  
  io.to(payload.roomId).emit('newMessage', messageWithTime)

  await dataClient.rpush(REDIS_QUEUE_KEY, JSON.stringify(messageWithTime))
}