import { addNewUser, changeName, changePassword, deleteUser, getMe, getUserById, updateProfileImage, updateUser } from "@/controllers/user.controller"
import { addToLikes, deleteLikeDevice, getUserLikeListSmartphones, getUserLikes } from "@/controllers/userLike.controller"
import { addNotificationToUser, deleteNotification, getUserNotifications, markNotificationAsRead } from "@/controllers/userNotification.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { actionAuth, requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/me")
.get(asyncWrapper(requireAuth) ,asyncWrapper(getMe))

router.route("/new")
.post(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(addNewUser))

router.route("/likes")
.get(asyncWrapper(requireAuth), asyncWrapper(getUserLikes))

router.route("/update-profile-image")
.patch(asyncWrapper(requireAuth), asyncWrapper(updateProfileImage))

router.route("/like-list")
.post(asyncWrapper(requireAuth), asyncWrapper(getUserLikeListSmartphones))

router.route("/add-to-likes")
.post(asyncWrapper(requireAuth), asyncWrapper(addToLikes)) 

router.route("/notification")
.post(asyncWrapper(requireAuth), asyncWrapper(addNotificationToUser))
.get(asyncWrapper(requireAuth), asyncWrapper(getUserNotifications))

router.route("/notification/mark-read")
.post(asyncWrapper(requireAuth), asyncWrapper(markNotificationAsRead))

router.route("/notification/:notifId")
.delete(asyncWrapper(requireAuth), asyncWrapper(deleteNotification))

router.route("/change-password/:userId")
.patch(asyncWrapper(requireAuth) ,asyncWrapper(changePassword))

router.route("/change-name/:userId")
.patch(asyncWrapper(requireAuth) ,asyncWrapper(changeName))

router.route("/:deviceId")
.delete(asyncWrapper(requireAuth) ,asyncWrapper(deleteLikeDevice))

router.route("/:userId")
.get(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(getUserById))
.patch(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(updateUser))
.delete(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(deleteUser))

export default router