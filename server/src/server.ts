import express, { type Request, type Response } from 'express'
import cors from 'cors'
import smartphonesRouter from "./routes/smartphones.route"
import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"
import usersRouter from "./routes/users.route"
import commentsRouter from "./routes/comments.route"
import { connectMongoDB } from './db/connect'
import cookieParser from 'cookie-parser' 
import passport from './services/passport'
import emailRouter from "./routes/email.route"
import { isTokenValid, signJwt, verifyJwt } from './utils/jwt'
import type { User } from '@prisma/client'
import { type DecodedToken } from './middlewares/auth.middleware'
import notFound from './middlewares/notFound.middleware'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'
import http from 'http'
import { Server, Socket } from 'socket.io'
import prisma from './prismaClient'
import type { ServerToClientEvents, SocketData } from './types/types'
import { Cookie } from 'bun'

export const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173"
export const productionUrl = process.env.SERVER_PRODUCTION_URL
const refreshSecretKey = process.env.REFRESH_JWT_SECRET
const accessSecretKey = process.env.ACCESS_JWT_SECRET
const socketSecretKey = process.env.SOCKET_JWT_SECRET
const notifSocket = process.env.NOTIFICATION_SOCKET_NAMESPACE
const commentSocket = process.env.COMMENTS_SOCKET_NAMESPACE

if(
  !refreshSecretKey || 
  !accessSecretKey || 
  !socketSecretKey || 
  !productionUrl ||
  !notifSocket ||
  !commentSocket 
) throw new Error("server secret key is empty")

app.use(cors({
  origin: [clientUrl, productionUrl, "https://www.wephonespec.site"],
  credentials: true,   
}))

export const io = new Server<SocketData, ServerToClientEvents>(server, {
  cors: {
    origin: [clientUrl, notifSocket, commentSocket, productionUrl, "https://www.wephonespec.site"],
    methods: ['GET', 'POST'],
    credentials: true
  }
})

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

app.use("/api/v1/comments", commentsRouter)

app.use("/api/v1/users", usersRouter)

app.use("/api/v1/email", emailRouter)

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: productionUrl, session: false }),
  (req, res) => {
    const user = req.user as User

    const refreshToken = signJwt({ id: user.id }, refreshSecretKey, { expiresIn: "5d" });
    const accessToken = signJwt({ id: user.id }, accessSecretKey, { expiresIn: "15m" });
    const socketToken = signJwt({ id: user.id }, socketSecretKey, { expiresIn: "7d" });
    
    res
      .cookie("socketToken", socketToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect(
        `${productionUrl}/email/oauth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}}`
      );
  }
);

app.get('/api/v1', (req: Request, res: Response): void => {
  res.json({ message: 'Hello from Express!' })
})

app.use(notFound)
app.use(errorHandlerMiddleware)

// webSocket
io.on("connection", socket => {
  console.log("User connected:", socket.id)
  // socket.on("test", smartphoneId => {
  //   console.log(smartphoneId)
  // })
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })

  // socket.disconnect()
})

export const notification = io.of("/notification")
export const comments = io.of("/comments")

// MIDDLEWARE
notification.use(async (socket, next) => {
  const cookie = socket.handshake.headers.cookie || ""
  const token = Cookie.parse(cookie).value

  if(!isTokenValid(token)) return

  try {
    const decoded = verifyJwt(token, socketSecretKey) as DecodedToken

    const user = await prisma.user.findUnique({ 
      where: { 
        id: decoded.id 
      },
      select: {
        id: true,
        name: true
      }
    })

    if(!user) return next(new Error("Unauthorized"))

    socket.data.user = user
    next()
  } catch (error) {
    next(error as Error)
  }
})

comments.use(async (socket, next) => {
  const cookie = socket.handshake.headers.cookie || "" 
  // if(!cookie) return // dont listen to live comments if user in not registered
  const token = Cookie.parse(cookie).value

  // if empty token, pass socket id so unregistered users can still receive live comments 
  if(!token) {
    socket.data.user = { name: null, id: null }
    next()
    return
  } 

  try {
    const decoded = verifyJwt(token, socketSecretKey) as DecodedToken
    const user = await prisma.user.findUnique({ 
      where: { 
        id: decoded.id
      }, 
      select: { 
        id: true, 
        name: true } 
    })

    if(!user) return next(new Error("Unauthorized"))

    socket.data.user = user
    next()
  } catch (error) {
    next(error as Error)
  }
})


notification.on("connection", socket => {
  console.log(`${socket.data.user.name ?? "unregistered-user"} connected in notification`)

  socket.on('disconnect', () => {
    console.log(`${socket.data.user.name ?? "unregistered-user"} disconnected from notification`);
  });
  // notification.disconnectSockets()
})

comments.on("connection", (socket: Socket<ServerToClientEvents>)  => {
  socket.on("joinSmartphoneRoom", (smartphoneId: string) => {
    socket.join(smartphoneId)
    console.log(`${socket.data.user.name ?? `unregistered-${socket.id}`} joined smartphone room ${smartphoneId}`);
  })

  socket.on("add-comment", async (comment) => {
    if(!socket.data.user.name) return // block unregistered users so they cant send comment, but they can still receive comments
    // const user = socket.data.user as User
    // console.log(comment.id)
    // await prisma.smartphoneComments.create({
    //   data: {
    //     id: comment.id,
    //     name: user.name!,
    //     userId: user.id,
    //     deviceId: smartphoneId,
    //     message: comment.message
    //   }
    // })
    socket.to(comment.deviceId).emit("new-comment", comment)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.data.user.name ?? "unregistered-user"} disconnected from comments`)
  })
  // comments.disconnectSockets()
})

server.listen(PORT, () => {
  connectMongoDB()
  console.log(`Server running on port ${process.env.PORT}`)
})