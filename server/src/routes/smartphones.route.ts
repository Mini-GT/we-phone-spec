import { getSmartphone, getSmartphonesByBrand, getAllSmartphones, createSmartphone } from "@/controllers/smartphones.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import express from "express"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getAllSmartphones))

router.route("/:deviceId")
.get(asyncWrapper(getSmartphone))

router.route("/brand-list/:brand")
.get(asyncWrapper(getSmartphonesByBrand))

router.route("/")
.post(asyncWrapper(createSmartphone))

export default router