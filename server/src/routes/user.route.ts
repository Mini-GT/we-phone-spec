import { deleteUser, getUser, updatetUser } from "@/controllers/user.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { actionAuth, requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/me")
.get(asyncWrapper(requireAuth) ,asyncWrapper(getUser))

router.route("/:userId")
.patch(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(updatetUser))

router.route("/:userId")
.delete(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(deleteUser))

export default router