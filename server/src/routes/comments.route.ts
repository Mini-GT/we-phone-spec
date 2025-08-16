import { addLikeToComment, deleteComment, dislikeToComment, editComment, getSmartphoneComments, sortComment } from "@/controllers/comments.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/")
.get(asyncWrapper(getSmartphoneComments))

// router.route("/view-more")
// .get(asyncWrapper(getViewMoreSmartphoneComments))

router.route("/sort/:sortOrder")
.get(asyncWrapper(sortComment))

router.route("/like/:commentId")
.get(asyncWrapper(requireAuth), asyncWrapper(addLikeToComment))

router.route("/dislike/:commentId")
.get(asyncWrapper(requireAuth), asyncWrapper(dislikeToComment))

router.route("/edit/:commentId")
.patch(asyncWrapper(requireAuth), asyncWrapper(editComment))

router.route("/:commentId")
.delete(asyncWrapper(requireAuth), asyncWrapper(deleteComment))

export default router