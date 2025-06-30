import { getSmartphone, getSmartphonesByBrand, getAllSmartphones, createSmartphone, updateSmartphone, deleteSmartphone } from "@/controllers/smartphones.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { actionAuth, requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getAllSmartphones))

router.route("/:deviceId")
.get(asyncWrapper(getSmartphone))

router.route("/brand-list/:brand")
.get(asyncWrapper(getSmartphonesByBrand))

// actions
router.route("/")
.post(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(createSmartphone))

router.route("/:deviceId")
.patch(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(updateSmartphone))

router.route("/:deviceId")
.delete(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(deleteSmartphone))






export default router