import mongoose from 'mongoose'
import "dotenv/config"

export const connectMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to DB...')
    // console.log('MongoDB connected: ', conn.connection.host)
  } catch (error) {
    console.log('MongoDB connection error: ', error)
  }
}