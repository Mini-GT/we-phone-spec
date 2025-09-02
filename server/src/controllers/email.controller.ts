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

  const now = new Date()
  let verficationToken = user.verifyToken
  let verificationTokenExpiry = user.verifyTokenExpiry
  const status = user.status

  if(status === "verified") {
    res.status(400).json({ message: "user already verified" })
  }


  if (!verficationToken || !verificationTokenExpiry || verificationTokenExpiry < now) {
    // generate new token if missing or expired
    verficationToken = uuidv4();
    verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: "pending",
        verifyToken: verficationToken,
        verifyTokenExpiry: verificationTokenExpiry,
      },
    })
  }

  await emailService.sendVerificationEmail(user.email, verficationToken)

  res.status(200).json({ message: "Email Verification Sent. Please check your inbox/spambox."})
}

const verifyEmail = async (req: Request, res: Response) => {
  const { verifyToken } = req.query;
  if(!verifyToken || typeof verifyToken !== 'string') {
    return res.status(400).json({ message: 'Invalid token' })
  }
  
  const user = await prisma.user.findFirst({
    where: {
      verifyToken,
      verifyTokenExpiry: { gt: new Date() },
    },
  })


  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      status: "verified",
      verifyToken: null,
      verifyTokenExpiry: null,
    },
  })

  res.status(200).json({ message: 'Email verified successfully!' })
}

export {
  updateUserEmailVerification,
  verifyEmail
}