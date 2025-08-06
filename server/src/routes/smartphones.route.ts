import { 
  getSmartphone, 
  getSmartphonesByBrand, 
  getAllSmartphones, 
  createSmartphone, 
  updateSmartphone, 
  deleteSmartphone, 
  searchSmartphone, 
  viewSmartphone,
  getTopDeviceViewStats,
} from "@/controllers/smartphones.controller"
import { asyncWrapper } from "@/middlewares/asyncWrapper.middleware"
import { actionAuth, requireAuth } from "@/middlewares/auth.middleware"
import express from "express"

const router = express.Router()

//routes
router.route("/")
.get(asyncWrapper(getAllSmartphones))
// actions
.post(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(createSmartphone))

router.route("/search")
.get(asyncWrapper(searchSmartphone))

router.route("/top-view-stats")
.get(asyncWrapper(getTopDeviceViewStats))

router.route("/brand-list/:brand")
.get(asyncWrapper(getSmartphonesByBrand))

router.route("/view/:deviceId")
.patch(asyncWrapper(viewSmartphone))

router.route("/:deviceId")
.get(asyncWrapper(getSmartphone))
.patch(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(updateSmartphone))
.delete(asyncWrapper(requireAuth), asyncWrapper(actionAuth), asyncWrapper(deleteSmartphone))


export default router