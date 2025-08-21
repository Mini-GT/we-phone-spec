import type { Request, Response } from "express"
import { phones } from "mockData";
import deviceModel from "@/models/device.model";
import prisma from "@/prismaClient";
import { notification } from "@/server";
import { changeDeviceStats } from "@/utils/smartphoneView";

const getAllSmartphones = async (req: Request, res: Response)=> {
  const smartphones = await deviceModel.find().lean()
  res.status(200).json({ phones: smartphones })
}

const getTopDeviceViewStats = async (req: Request, res: Response) => {
  const topToday = await deviceModel.find()
  .sort({ "stats.today": -1 })
  .limit(10)
  .lean()

  const topWeek = await deviceModel.find()
  .sort({ "stats.week": -1 })
  .limit(10)
  .lean()

  const topMonth = await deviceModel.find()
  .sort({ "stats.month": -1 })
  .limit(10)
  .lean()

  res.status(200).json({topToday, topWeek, topMonth})
} 

const createSmartphone = async (req: Request, res: Response) => {
  // console.log(req.body)
  const deviceData = new deviceModel(req.body)
  const newDevice = await deviceData.save()
  
  const newDeviceNotification = await prisma.globalNotification.create({
    data: {
      globalNotificationId: newDevice.id,
      title: `${newDevice.name} - New Device [specification] available NOW!`,
      image: newDevice.image,
      createdAt: newDevice.createdAt,
      name: newDevice.name ?? "",
      description: newDevice.description
    }
  })

  notification.emit("newDeviceNotification", newDeviceNotification)

  res.status(201).json({ result: "success" })
}

const searchSmartphone = async (req: Request, res: Response) => {
  const { q } = req.query;

  if (typeof q !== "string") {
    return res.status(400).json({ result: "failed", message: "Query is not valid" });
  }

  const data = await deviceModel.find({
    name: { $regex: q, $options: "i" },
  }).limit(5)

  return res.status(200).json({ result: "success", data })
}

const getSmartphonesByBrand = async (req: Request, res: Response) => {
  const { brand } = req.params
  
  if(!brand) {
    return res.json({ msg: "Brand name not provided"})
  }
  
  const result = await deviceModel.find({ brand: { $regex: `^${brand}$`, $options: "i" } }).exec()
  
  if(!result) {
    return res.json({ msg: "No Devices found with this brand"})
  }

  res.json({ result })
}

const getSmartphone = async (req: Request, res: Response) => {
  const { deviceId } = req.params
  const result = await deviceModel.findById(deviceId).lean().exec()
  
  if(!result) {
    return res.json({ msg: "No Device found"})
  }

  res.json({ msg: result })
}

const updateSmartphone = async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId
  const body = req.body

  const updated = await deviceModel.findByIdAndUpdate(deviceId, body, { new: true })
  if(!updated) return res.status(404).json({ error: "Device not found" })

  res.json({ result: "success", updated });
}

const getTopViewedSmartphones = async (req: Request, res: Response) => {
  const limitNumber = parseInt(req.query.limitNumber as string)
  const sort = req.query.sort as "asc" | "desc"

  if (isNaN(limitNumber) || !['asc', 'desc'].includes(sort)) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  
  const topViewed = await deviceModel.find()
    .sort({ views: sort === 'asc' ? 1 : -1 })
    .limit(limitNumber ?? null)
    .lean()

  if (!topViewed || topViewed.length === 0) {
    return res.status(404).json({ error: "No top viewed smartphones found" });
  }

  res.status(200).json({ result: "success", topViewed });
}

const getTopLikedSmartphones = async (req: Request, res: Response) => {
  const limitNumber = parseInt(req.query.limitNumber as string)
  const sort = req.query.sort as "asc" | "desc"

  if (isNaN(limitNumber) || !['asc', 'desc'].includes(sort)) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  
  const topLiked = await deviceModel.find()
    .sort({ likes: sort === 'asc' ? 1 : -1 })
    .limit(limitNumber ?? null)
    .lean()

  if (!topLiked || topLiked.length === 0) {
    return res.status(404).json({ error: "No top viewed smartphones found" });
  }

  res.status(200).json({ result: "success", topLiked});
}

const getNewAddedSmartphones = async (req: Request, res: Response) => {
  const limitNumber = parseInt(req.query.limitNumber as string)
  const sort = req.query.sort as "asc" | "desc"

  if (isNaN(limitNumber) || !['asc', 'desc'].includes(sort)) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  
  const newAddedSmartphones = await deviceModel.find()
    .sort({ createdAt: sort === 'asc' ? 1 : -1 })
    .limit(limitNumber ?? null)
    .lean()

  if (!newAddedSmartphones || newAddedSmartphones.length === 0) {
    return res.status(404).json({ error: "No top viewed smartphones found" });
  }

  res.status(200).json({ result: "success", newAddedSmartphones });
}

const deleteSmartphone = async (req: Request, res: Response) => {
  const { deviceId } = req.params
  
  const deleteDevice = await deviceModel.findByIdAndDelete(deviceId)
  if(!deleteDevice) return res.status(404).json({ error: "Device not found" })

  await prisma.userSmartphoneLike.deleteMany({ 
    where: { 
      smartphoneId: deviceId 
    } 
  })

  res.status(200).json({ result: "success", deleteDevice })
}

const incrementViewSmartphone = async (req: Request, res: Response) => {
  const { deviceId } = req.params
  console.log(deviceId)
  if(!deviceId) return res.status(404).json({ error: "Device not found" })
  await changeDeviceStats(deviceId)
  res.sendStatus(200)
}



export {
  getAllSmartphones,
  getSmartphone,
  createSmartphone,
  getSmartphonesByBrand,
  updateSmartphone,
  deleteSmartphone,
  searchSmartphone,
  incrementViewSmartphone,
  getTopDeviceViewStats,
  getTopViewedSmartphones,
  getTopLikedSmartphones,
  getNewAddedSmartphones ,
}