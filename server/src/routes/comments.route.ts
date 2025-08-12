import { getSmartphoneComments } from "@/controllers/userComments.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import express from "express"

const router = express.Router()

router.route("/")
.get(asyncWrapper(getSmartphoneComments))

export default router