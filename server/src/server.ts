import express, { type Request, type Response } from 'express'
import cors from 'cors'
import smartphonesRouter from "./routes/smartphones.route"
import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"
import { connectMongoDB } from './db/connect'
import cookieParser from 'cookie-parser' 
import session from 'express-session'
import passport from './services/passport'
import emailRouter from "./routes/email.route"
import path from "path"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,   
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET || "my-secret-key",
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

app.use("/api/v1/smartphones", smartphonesRouter)

app.use("/api/v1/auth", authRouter)

app.use("/api/v1/user", userRouter)

app.use("/api/v1/user", emailRouter)

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173" }),
  (req, res) => {
    // success handler
    res.redirect("http://localhost:5173");
  }
);

app.get('/api/v1', (req: Request, res: Response): void => {
  res.json({ message: 'Hello from Express!' })
})

app.listen(PORT, () => {
  // connectMongoDB()
  console.log(`Server running on port ${process.env.PORT}`)
})