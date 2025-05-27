import type { Request, Response } from "express"
import { phones } from "mockData";

const getSmartphones = async (req: Request, res: Response)=> {
  res.json({ phones: phones })
}

const getSmartphone = async (req: Request, res: Response) => {
  const { deviceId } = req.params
  
  const result = phones.find(phone => phone.id === deviceId)
  
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
  
  const result = phones.filter(phone => phone.brand.toLowerCase() === brand.toLowerCase())
  if(!result) {
    return res.json({ msg: "No Devices found with this brand"})
  }

  res.json({ result })
}

const createSmartphone = async (req: Request, res: Response) => {
  const { name } = req.params
  console.log(name)
}

export {
  getSmartphones,
  getSmartphone,
  createSmartphone,
  getSmartphonesByBrand
}