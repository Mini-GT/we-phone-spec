import { createSmartphone, getSmartphone, getSmartphones } from "@/controllers/smartphones.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import express from "express"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getSmartphones))


router.route("/:deviceId")
.get(asyncWrapper(getSmartphone))

export default router