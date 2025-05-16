import { updateCurrentUser } from "@/controllers/auth.controller"
import { getUserData } from "@/controllers/user.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/me")
.patch(requireAuth ,asyncWrapper(updateCurrentUser))

export default router