import { getSmartphone, getSmartphonesByBrand, getSmartphones } from "@/controllers/smartphones.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import express from "express"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getSmartphones))

router.route("/:deviceId")
.get(asyncWrapper(getSmartphone))

router.route("/brand-list/:brand")
.get(asyncWrapper(getSmartphonesByBrand))

export default router