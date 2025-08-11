import { getSmartphoneComments } from "@/controllers/userComments.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

router.route("/:smartphoneId")
.get(asyncWrapper(getSmartphoneComments))

export default router