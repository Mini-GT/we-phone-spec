import prisma from "@/prismaClient";
import { type Request, type Response } from "express"
import { v4 as uuidv4 } from "uuid"
import emailService from "@/services/email.service";
import type { User } from "@prisma/client";
import { email } from "@/schemas/email.schema";
import z from "zod";
import { signJwt } from "@/utils/jwt";
import { resetPasswordSchema } from "@/schemas/resetPassword.schema";


const resetPassJWTSecretKey = process.env.RESET_PASSWORD_JWT_SECRET
if(!resetPassJWTSecretKey) throw new Error("JWT secret key is empty")

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

const forgotPassword = async (req: Request, res: Response) => {
  const { email: emailData } = req.query;
  const result = await email.safeParseAsync(emailData)
  if(!result.success) {
    const flattened = z.flattenError(result.error)
    const [defaultErr, customErr] = flattened.formErrors
    return res.status(400).json({ error: customErr ?? defaultErr })
  }

  const { data } = result

  const user = await prisma.user.findUnique({
    where: {
      email: data 
    }
  })

  if(!user) {
    return res.status(400).json({ message: "Reset password sent unsuccessful" })
  }

  const resetToken = signJwt(
    { id: user.id },
    resetPassJWTSecretKey,
    { expiresIn: "1h" }
  )

  await emailService.sendEmailResetPassword(user.email, resetToken)

  res.status(200).json({ message: "Reset password sent successfully" })
}

const resetPassword = async (req: Request, res: Response) => {
  const { password, confirmPassword, email } = req.body;

  const result = await resetPasswordSchema.safeParseAsync({
    password: password,
    confirmPassword: confirmPassword 
  })

  if(!result.success) {
    const flattened = z.flattenError(result.error)
    return res.status(400).json({ 
      passErr: flattened.fieldErrors.password, 
      confirmErr: flattened.fieldErrors.confirmPassword 
    })
  }

  if(result.data.password !== result.data.confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match" })
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  
  if(!user) {
    return res.status(400).json({ message: "Cannot reset password" })
  }

  await prisma.user.update({
    where: {
      email
    }, 
    data: {
      password: result.data.password,
    }
  })

  res.status(200).json({ message: "Reset password changed successfully" })
}

export {
  updateUserEmailVerification,
  verifyEmail,
  forgotPassword,
  resetPassword
}