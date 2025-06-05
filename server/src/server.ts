import express, { type Request, type Response } from 'express'
import cors from 'cors'
import smartphonesRouter from "./routes/smartphones.route"
import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"
import usersRouter from "./routes/users.route"
import { connectMongoDB } from './db/connect'
import cookieParser from 'cookie-parser' 
import session from 'express-session'
import passport from './services/passport'
import emailRouter from "./routes/email.route"
import path from "path"
import { sign } from 'crypto'
import { signJwt } from './utils/jwt'
import type { User } from '@prisma/client'
import { requireAuth } from './middlewares/auth.middleware'
import { asyncWrapper } from './middlewares/asyncWrapper.middleware'

export const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,   
}))
app.use(express.json())
app.use(cookieParser())
// app.use(session({
//   secret: process.env.SESSION_SECRET || "my-secret-key",
//   resave: false,
//   saveUninitialized: false,
// }))
app.use(passport.initialize())
// app.use(passport.session())
// app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

app.use("/api/v1/smartphones", smartphonesRouter)

app.use("/api/v1/auth", authRouter)

app.use("/api/v1/user", userRouter)

app.use("/api/v1/users", usersRouter)

app.use("/api/v1/user", emailRouter)

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173", session: false }),
  (req, res) => {
    const user = req.user as User

    const token = signJwt({ id: user.id }, { expiresIn: "5s" })
    
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

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