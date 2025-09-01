import type { Request, Response } from "express"
import deviceModel from "@/models/device.model";
import prisma from "@/prismaClient";
import { notification } from "@/server";
import { changeDeviceStats } from "@/utils/smartphoneView";

const getAllSmartphones = async (req: Request, res: Response)=> {
  const { skip, take } = req.query
  const skipNum = Number(skip) || 0
  const takeNum = Number(take) || 24

  const [smartphones, totalDocs] = await Promise.all([
    deviceModel.find()
      .skip(skipNum)
      .limit(takeNum)
      .sort({ _id: -1 })
      .exec(),
    deviceModel.countDocuments()
  ])

  res.status(200).json({ phones: smartphones, totalDocs })
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
  const { skip, take } = req.query
  const skipNum = Number(skip) || 0
  const takeNum = Number(take) || 24

  if(!brand) {
    return res.json({ msg: "Brand name not provided"})
  }
  
  const filter = { brand: { $regex: `^${brand}$`, $options: "i" } }
  const [smartphones, totalDocs] = await Promise.all([
    deviceModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(takeNum)
      .lean()
      .exec(),
    deviceModel.countDocuments(filter).lean()
  ])
  
  res.status(200).json({ phones: smartphones , totalDocs })
}

const getSmartphone = async (req: Request, res: Response) => {
  const { deviceId } = req.params

  const result = await deviceModel.findById(deviceId).lean()

  if(!result) {
    return res.status(404).json({ msg: "No Device found"})
  }

  res.status(200).json({ msg: result })
}

const updateSmartphone = async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId
  const body = req.body

  const updated = await deviceModel.findByIdAndUpdate(deviceId, body, { new: true })
  if(!updated) return res.status(404).json({ error: "Device not found" })

  res.json({ result: "success", updated });
}

const getTopViewedSmartphones = async (req: Request, res: Response) => {
  const { skip, take } = req.query
  const skipNum = Number(skip) || 0
  const takeNum = Number(take) || 5

  const [topViewed, totalDocs] = await Promise.all([
    deviceModel.find()
      .sort({ views: -1 })
      .skip(skipNum)
      .limit(takeNum)
      .lean()
      .exec(),
    deviceModel.countDocuments()
  ])

  if (!topViewed || topViewed.length === 0) {
    return res.status(404).json({ result: "failed", topViewed });
  }

  res.status(200).json({ result: "success", topViewed, totalDocs });
}

const getTopLikedSmartphones = async (req: Request, res: Response) => {
  const { skip, take } = req.query
  const skipNum = Number(skip) || 0
  const takeNum = Number(take) || 5
  
  const [topLiked, totalDocs] = await Promise.all([
    deviceModel.find()
      .sort({ likes: -1 })
      .skip(skipNum)
      .limit(takeNum)
      .lean()
      .exec(),
    deviceModel.countDocuments()
  ])

  if (!topLiked || topLiked.length === 0) {
    return res.status(404).json({ result: "failed", topLiked });
  }

  res.status(200).json({ result: "success", topLiked, totalDocs });
}

const getNewAddedSmartphones = async (req: Request, res: Response) => {
  const { skip, take } = req.query
  const skipNum = Number(skip) || 0
  const takeNum = Number(take) || 5
  
  const [newAddedSmartphones, totalDocs] = await Promise.all([
    deviceModel.find()
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(takeNum)
      .lean()
      .exec(),
    deviceModel.countDocuments()
  ])

  if (!newAddedSmartphones || newAddedSmartphones.length === 0) {
    return res.status(404).json({ result: "failed", newAddedSmartphones });
  }

  res.status(200).json({ result: "success", newAddedSmartphones, totalDocs });
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