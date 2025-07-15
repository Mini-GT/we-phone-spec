import { addNewUser, addToLikes, changeName, changePassword, deleteUser, getMe, getUserById, getUserLikes, updateUser } from "@/controllers/user.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { actionAuth, requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/me")
.get(asyncWrapper(requireAuth) ,asyncWrapper(getMe))

router.route("/new")
.post(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(addNewUser))

router.route("/likes")
.get(asyncWrapper(getUserLikes))

router.route("/add-to-likes")
.post(asyncWrapper(requireAuth), asyncWrapper(addToLikes)) 

router.route("/change-password/:userId")
.patch(asyncWrapper(requireAuth) ,asyncWrapper(changePassword))

router.route("/change-name/:userId")
.patch(asyncWrapper(requireAuth) ,asyncWrapper(changeName))

router.route("/:userId")
.get(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(getUserById))
.patch(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(updateUser))
.delete(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(deleteUser))



export default router