import { login, logout, refresh, register } from "@/controllers/auth.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import express from "express"

const router = express.Router()

router.route("/login")
.post(asyncWrapper(login))

router.route("/register")
.post(asyncWrapper(register))

router.route("/refreshToken")
.get(asyncWrapper(refresh))

router.route("/logout")
.get(asyncWrapper(logout))

export default router