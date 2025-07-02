import { deleteUser, getMe, getUserById, updatetUser } from "@/controllers/user.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { actionAuth, requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/me")
.get(asyncWrapper(requireAuth) ,asyncWrapper(getMe))

router.route("/:userId")
.get(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(getUserById))
.patch(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(updatetUser))
.delete(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(deleteUser))

export default router