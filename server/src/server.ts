import express, { type Request, type Response } from 'express'
import cors from 'cors'
import smartphonesRouter from "./routes/smartphones.route"
import authRouter from "./routes/auth.route"
import { connectMongoDB } from './db/connect'
import "dotenv/config"

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,   
}))
app.use(express.json())

app.use("/api/v1/smartphones", smartphonesRouter)

app.use("/api/v1/auth", authRouter)

app.get('/api/v1', (req: Request, res: Response): void => {
  res.json({ message: 'Hello from Express!' })
})

app.listen(process.env.PORT, () => {
  connectMongoDB()
  console.log(`Server running on port ${process.env.PORT}`)
})