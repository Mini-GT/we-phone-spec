import type { Request, Response } from "express"
import prisma from "@/prismaClient"

const getSmartphoneComments = async (req: Request, res: Response)=> {
  const { smartphoneId, skip, take } = req.query
  
  const skipNum = Number(skip) || 0
  const takeNum = Number(take) || 5

  const comments = await prisma.smartphoneComments.findMany({
    skip: skipNum,
    take: takeNum,
    where: {
      deviceId: smartphoneId as string,
      isDeleted: false
    },
    orderBy: {
      likes: "desc"
    },
    select: {
      id: true,
      createdAt: true,
      likes: true,
      userId: true,
      dislikes: true,
      isDeleted: true,
      message: true,
      name: true,
      user: {
        select: {
          name: true, 
          role: true,
        }
      }
    }
  })

  return res.status(200).json({ result: "success", comments })
}

const addLikeToComment = async (req: Request, res: Response)=> {
  const { commentId } = req.params
  const comments = await prisma.smartphoneComments.update({
    where: {
      id: commentId
    },
    data: {
      likes: { increment: 1 }
    }
  })

  return res.status(200).json({ result: "success" })
}

const dislikeToComment = async (req: Request, res: Response)=> {
  const { commentId } = req.params
  const comments = await prisma.smartphoneComments.update({
    where: {
      id: commentId
    },
    data: {
      dislikes: { increment: 1 }
    }
  })

  return res.status(200).json({ result: "success", comments })
}

const editComment = async (req: Request, res: Response)=> {
  const { commentId } = req.params
  const { text } = req.body;
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text cannot be empty" })
  }

  const updatedComment = await prisma.smartphoneComments.update({
    where: { 
      id: commentId
    },
    data: { message: text },
  })

  return res.status(200).json({ result: "success", updatedComment })
}

const sortComment = async (req: Request, res: Response)=> {
  const sortOrder = req.params.sortOrder as "asc" | "desc"
  console.log(sortOrder)
  // const sortedComments = await prisma.smartphoneComments.findMany({
  //   orderBy: {
  //     createdAt: sortOrder
  //   }
  // })

  // return res.status(200).json({ result: "success", sortedComments })
}


const deleteComment = async (req: Request, res: Response)=> {
  const { commentId } = req.params
  await prisma.smartphoneComments.update({
    where: {
      id: commentId
    },
    data: {
      isDeleted: true
    }
  })

  return res.status(200).json({ result: "success" })
}

export {
  getSmartphoneComments,
  addLikeToComment,
  dislikeToComment,
  editComment,
  deleteComment,
  sortComment,
}