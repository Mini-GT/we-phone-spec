import { CustomAPIError } from "@/errors/customError";
import type { Request, Response } from "express"
import { phones } from "mockData";

const getSmartphones = async (req: Request, res: Response)=> {
  res.json({ phones: phones })
}

const getSmartphone = async (req: Request, res: Response) => {
  const { deviceId } = req.params

  const result = phones.find(phone => phone.id === Number(deviceId))
  
  if(!result) {
    return res.json({ msg: "No Device found"})
  }

  res.json({ msg: result})
}

const createSmartphone = async (req: Request, res: Response) => {
  const { name } = req.params
  console.log(name)
}

export {
  getSmartphones,
  getSmartphone,
  createSmartphone,
}