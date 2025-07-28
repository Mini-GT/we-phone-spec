import type { Request, Response } from "express"
import type { User } from "@prisma/client"
import prisma from "@/prismaClient"
import deviceModel from "@/models/device.model";
import mongoose from "mongoose";
import type { LikedSmartphoneIds } from "@/types/types";

const addToLikes = async (req: Request, res: Response) => {
  const { deviceId } = req.body
  const user = req.user as User

  const alreadyLiked = await prisma.userSmartphoneLike.findUnique({
    where: {
      userId_smartphoneId: {
        userId: user.id,
        smartphoneId: deviceId
      }
    }
  });

  if (alreadyLiked) {
    // unlike the device
    await deviceModel.findByIdAndUpdate(deviceId, { $inc: { likes: -1 } })
    
    const result = await prisma.userSmartphoneLike.delete({
      where: {
        userId_smartphoneId: {
          userId: user.id,
          smartphoneId: deviceId
        }
      }
    })
    
    return res.status(200).json({ result: "success", message: "Device unliked" })
  }

  await deviceModel.findByIdAndUpdate(deviceId, { $inc: { likes: 1 } })

  await prisma.userSmartphoneLike.create({
    data: {
      user: { connect: { id: user.id } },
      smartphoneId: deviceId
    }
  })

  return res.status(200).json({ result: "success", message: "Device Liked" })
}

const getUserLikes = async (req: Request, res: Response) => {
  const user = req.user as User 

  const likedSmartphoneId = await prisma.userSmartphoneLike.findMany({
    where: { userId: user.id },
    select: { smartphoneId: true }
  });

  return res.status(200).json({ result: "success", likedSmartphoneId })
}


const deleteLikeDevice = async (req: Request, res: Response) => {
  const user = req.user as User 
  const { deviceId } = req.params

  if(!deviceId) return res.status(400).json({ result: "failed", message: "No device Id provided" })

  await prisma.userSmartphoneLike.delete({
    where: {
      userId_smartphoneId: {
        userId: user.id,
        smartphoneId: deviceId
      }
    }
  })

  return res.status(200).json({ result: "success", message: "Device remove from like list" })
}

const getUserLikeListSmartphones = async (req: Request, res: Response)=> {
  const liked = req.body.smartphoneIds as LikedSmartphoneIds[]
  if(!liked) return res.status(400).json({ result: "failed", message: "No like id/s provided" })
  const ids = liked.map(item => item.smartphoneId)

  // convert to mongoose objectIds to make sure it is accepted by mongoose
  const objectIds = ids.map(id => new mongoose.Types.ObjectId(id))
  const smartphones = await deviceModel.find({
    _id: { $in: objectIds }
  });

  return res.status(200).json({ result: "success", smartphones })
}

export {
  addToLikes,
  getUserLikes,
  getUserLikeListSmartphones,
  deleteLikeDevice 
}