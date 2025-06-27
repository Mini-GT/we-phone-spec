import { getSmartphone, getSmartphonesByBrand, getAllSmartphones, createSmartphone, updateSmartphone } from "@/controllers/smartphones.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getAllSmartphones))

router.route("/:deviceId")
.get(asyncWrapper(getSmartphone))

router.route("/:deviceId")
.patch(asyncWrapper(requireAuth), asyncWrapper(updateSmartphone))

router.route("/brand-list/:brand")
.get(asyncWrapper(getSmartphonesByBrand))

router.route("/")
.post(asyncWrapper(requireAuth), asyncWrapper(createSmartphone))

export default router