import { getSmartphone, getSmartphonesByBrand, getAllSmartphones, createSmartphone, updateSmartphone, deleteSmartphone } from "@/controllers/smartphones.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { actionAuth, requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getAllSmartphones))
// actions
.post(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(createSmartphone))

router.route("/brand-list/:brand")
.get(asyncWrapper(getSmartphonesByBrand))

router.route("/:deviceId")
.get(asyncWrapper(getSmartphone))
.patch(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(updateSmartphone))
.delete(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(deleteSmartphone))


export default router