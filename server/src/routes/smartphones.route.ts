import { getSmartphone, getSmartphonesByBrand, getAllSmartphones, createSmartphone, updateSmartphone } from "@/controllers/smartphones.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import express from "express"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getAllSmartphones))

router.route("/:deviceId")
.get(asyncWrapper(getSmartphone))

router.route("/:deviceId")
.patch(asyncWrapper(updateSmartphone))

router.route("/brand-list/:brand")
.get(asyncWrapper(getSmartphonesByBrand))

router.route("/")
.post(asyncWrapper(createSmartphone))

export default router