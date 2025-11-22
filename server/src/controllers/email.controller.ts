import prisma from "@/prismaClient";
import { type Request, type Response } from "express"
import { v4 as uuidv4 } from "uuid"
import emailService from "@/services/email.service";
import type { User } from "@prisma/client";
import { email } from "@/schemas/email.schema";
import z from "zod";
import { resetPasswordSchema } from "@/schemas/resetPassword.schema";
import bcrypt from "bcryptjs";

const resetPassJWTSecretKey = process.env.RESET_PASSWORD_JWT_SECRET
if(!resetPassJWTSecretKey) throw new Error("JWT secret key is empty")

const updateUserEmailVerification = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  const user = req.user as User
  const now = new Date()
  let verificationToken = user.emailVerifyToken
  let verificationTokenExpiry = user.emailVerifyTokenExpiry
  const status = user.status

  if(status === "verified") {
    res.status(400).json({ message: "user already verified" })
  }

  if (!verificationToken || !verificationTokenExpiry || verificationTokenExpiry < now) {
    // generate new token if missing or expired
    verificationToken = uuidv4();
    verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: "pending",
        emailVerifyToken: verificationToken,
        emailVerifyTokenExpiry: verificationTokenExpiry,
      },
    })
  }

  const result = await emailService.sendVerificationEmail(user.email, verificationToken)

  if(!result) {
    return res.status(401).json({ success: false, message: "Something went wrong"})
  }

  res.status(200).json({ message: "Email Verification Sent. Please check your inbox/spambox."})
}

const verifyEmail = async (req: Request, res: Response) => {
  const { emailVerifyToken } = req.query;
  if(!emailVerifyToken || typeof emailVerifyToken !== 'string') {
    return res.status(400).json({ message: 'Invalid token' })
  }
  
  const user = await prisma.user.findFirst({
    where: {
      emailVerifyToken,
      emailVerifyTokenExpiry: { gt: new Date() },
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      status: "verified",
      emailVerifyToken: null,
      emailVerifyTokenExpiry: null,
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

  const now = new Date()
  let forgotPasswordVerifyToken = user.forgotPassVerifyToken
  let forgotPasswordTokenExpiry = user.forgotPassTokenExpiry

  if (!forgotPasswordVerifyToken || !forgotPasswordTokenExpiry || forgotPasswordTokenExpiry < now) {
    // generate new token if missing or expired
    forgotPasswordVerifyToken = uuidv4();
    forgotPasswordTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await prisma.user.update({
      where: { id: user.id },
      data: {
        forgotPassVerifyToken: forgotPasswordVerifyToken,
        forgotPassTokenExpiry: forgotPasswordTokenExpiry,
      },
    })
  }

  await emailService.sendEmailForgotPassword(user.email, forgotPasswordVerifyToken)

  res.status(200).json({ message: "Reset password sent successfully" })
}

const resetPassword = async (req: Request, res: Response) => {
  const { password, confirmPassword, email, resetToken } = req.body;

  const result = await resetPasswordSchema.safeParseAsync({
    password,
    confirmPassword,
    email,
    resetToken
  })

  if(!result.success) {
    const flattened = z.flattenError(result.error)
    return res.status(400).json({ 
      passErr: flattened.fieldErrors.password, 
      confirmErr: flattened.fieldErrors.confirmPassword ,
      emailErr: flattened.fieldErrors.email,
      resetTokenErr: flattened.fieldErrors.resetToken,
    })
  }

  if(result.data.password !== result.data.confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match" })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
      forgotPassVerifyToken: resetToken,
      forgotPassTokenExpiry: { gt: new Date() }
    }
  })

  if(!user) {
    return res.status(400).json("Couldn\'t reset password please try again later")
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 8)

  await prisma.user.update({
    where: {
      email
    }, 
    data: {
      password: hashedPassword,
      forgotPassVerifyToken: null,
      forgotPassTokenExpiry: null,
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