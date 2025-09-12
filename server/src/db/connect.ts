import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI)
    // console.log(process.env.MONGO_URI)
    // console.log(conn)
    console.log('MongoDB connected: ', conn.connection.host)
  } catch (error) {
    console.log('MongoDB connection error: ', error)
  }
}