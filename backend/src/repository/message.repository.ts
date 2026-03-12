import messageModel from "../models/message.model";

interface Message {
  senderId: string;
  roomId: string,
  content: string;
  timestamp: string;
}

export const insertBulk = async (messages: Message[]) => {
  return messageModel.insertMany(messages) 
}