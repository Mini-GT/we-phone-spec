import prisma from "@/prismaClient";
import { type Request, type Response } from "express"
import { v4 as uuidv4 } from "uuid"
import emailService from "@/services/email.service";
import type { User } from "@prisma/client";

const updateUserEmailVerification = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  const user = req.user as User

  const verificationToken = uuidv4()
  const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  // const verificationExpiry = new Date(Date.now() + 1 * 60 * 1000) // 1 min

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verifyToken: verificationToken,
      verifyTokenExpiry: verificationExpiry,
    },
  })

  console.log(user)
  await emailService.sendVerificationEmail(user.email, verificationToken)

  res.json({ message: "Email Verification Sent. Please check your inbox/spambox."})
}

const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;
  if(!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token' })
  }
  
  const user = await prisma.user.findFirst({
    where: {
      verifyToken: token,
      verifyTokenExpiry: { gt: new Date() },
    },
  })


  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token' })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verifyToken: null,
      verifyTokenExpiry: null,
    },
  })

  res.json({ message: 'Email verified successfully!' })
}

export {
  updateUserEmailVerification,
  verifyEmail
}