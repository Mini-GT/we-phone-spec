import { getAllUsers } from "@/controllers/users.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/")
.get(asyncWrapper(requireAuth) ,asyncWrapper(getAllUsers))

export default router