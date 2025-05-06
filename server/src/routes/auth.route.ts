import { getCurrentUser, login, logout, register } from "@/controllers/auth.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/login")
.post(asyncWrapper(login))

router.route("/register")
.post(asyncWrapper(register))

router.route("/me")
.get(requireAuth ,asyncWrapper(getCurrentUser))

router.route("/logout")
.get(asyncWrapper(logout))

export default router