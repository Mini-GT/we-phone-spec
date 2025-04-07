import express, { type Request, type Response } from 'express'
import cors from 'cors'
import smartphonesRouter from "./routes/smartphones.route"
import { connectMongoDB } from './db/connect'
import "dotenv/config"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1/smartphones", smartphonesRouter)

app.get('/api/data', (req: Request, res: Response): void => {
  res.json({ message: 'Hello from Expre!' })
})

app.listen(process.env.PORT, () => {
  connectMongoDB()
  console.log('Server running on port 3000')
})