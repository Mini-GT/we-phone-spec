import { addNewUser, changeName, changePassword, deleteUser, getMe, getUserById, updatetUser } from "@/controllers/user.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { actionAuth, requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/me")
.get(asyncWrapper(requireAuth) ,asyncWrapper(getMe))

router.route("/new")
.post(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(addNewUser))

router.route("/:userId")
.get(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(getUserById))
.patch(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(updatetUser))
.delete(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(deleteUser))

router.route("/change-password/:userId")
.patch(asyncWrapper(requireAuth) ,asyncWrapper(changePassword))

router.route("/change-name/:userId")
.patch(asyncWrapper(requireAuth) ,asyncWrapper(changeName))

export default router