import type { Request, Response } from "express"
import { phones } from "mockData";
import deviceModel from "@/models/device.model";
import prisma from "@/prismaClient";
import { io } from "@/server";

const getAllSmartphones = async (req: Request, res: Response)=> {
  const smartphones = await deviceModel.find().lean()
  res.json({ phones: smartphones })
}

const getSmartphone = async (req: Request, res: Response) => {
  const { deviceId } = req.params
  const result = await deviceModel.findById(deviceId).lean().exec()
  
  if(!result) {
    return res.json({ msg: "No Device found"})
  }

  res.json({ msg: result })
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

const createSmartphone = async (req: Request, res: Response) => {
  // console.log(req.body)
  const deviceData = new deviceModel(req.body)
  const newDevice = await deviceData.save()
  
  const newDeviceNotification = [{
    id: newDevice._id,
    title: `${newDevice.name} - New Device [specification] available NOW!`,
    image: newDevice.image,
    date: newDevice.createdAt,
    description: newDevice.description,
    isRead: false,
  }]

  io.emit("newDeviceNotification", newDeviceNotification)

  res.status(201).json({ result: "success" })
}

const updateSmartphone = async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId
  const body = req.body

  const updated = await deviceModel.findByIdAndUpdate(deviceId, body, { new: true })
  if(!updated) return res.status(404).json({ error: "Device not found" })

  res.json({ result: "success", updated });
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

export {
  getAllSmartphones,
  getSmartphone,
  createSmartphone,
  getSmartphonesByBrand,
  updateSmartphone,
  deleteSmartphone
}