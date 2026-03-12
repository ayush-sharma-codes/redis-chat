import mongoose, { mongo } from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

export const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!)
    console.log(`Connected with MongoDB.... `, connection.connection.host)
  } catch (error) {
    console.error(`Error connecting to MongoDB: `, error)
  }
}
