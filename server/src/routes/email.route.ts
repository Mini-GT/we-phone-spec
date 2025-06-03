import { updateUserEmailVerification, verifyEmail } from "@/controllers/email.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/send-email-verification")
.post(asyncWrapper(requireAuth), asyncWrapper(updateUserEmailVerification))

router.route("/verify-email")
.get(asyncWrapper(requireAuth), asyncWrapper(verifyEmail))

export default router