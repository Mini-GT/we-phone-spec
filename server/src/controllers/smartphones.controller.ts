import type { Request, Response } from "express"
import { phones } from "mockData";
import deviceModel from "@/models/device.model";

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
  const device = new deviceModel(req.body)
  const saveSmartphone = await device.save()
  res.status(201).json(saveSmartphone)
}

export {
  getAllSmartphones,
  getSmartphone,
  createSmartphone,
  getSmartphonesByBrand
}