import type { Request, Response } from "express"
import prisma from "@/prismaClient"
import type { User } from "@prisma/client"

const getSmartphoneComments = async (req: Request, res: Response)=> {
  const { smartphoneId, skip, take, orderBy: orderType, sortDirection } = req.query
  
  const skipNum = Number(skip) || 0
  const takeNum = Number(take) || 5
  
  let orderBy: any

  if (orderType === "likes") {
    // Special case: likes DESC, createdAt DESC
    orderBy = [
      { likes: sortDirection },
      { createdAt: "asc" } 
    ]
  } else {
    // Default case: use requested order
    orderBy = { [orderType as string]: sortDirection }
    
  }

  const comments = await prisma.smartphoneComments.findMany({
    skip: skipNum,
    take: takeNum,
    where: {
      deviceId: smartphoneId as string,
      isDeleted: false
    },
    orderBy,
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
  return res.status(200).json({ comments })
}

// const getoreSmartphoneComments = async (req: Request, res: Response)=> {
//   const { smartphoneId, skip, take, orderBy: orderType, sortType } = req.query

//   const skipNum = Number(skip) || 0
//   const takeNum = Number(take) || 5

//   const comments = await prisma.smartphoneComments.findMany({
//     skip: skipNum,
//     take: takeNum,
//     where: {
//       deviceId: smartphoneId as string,
//       isDeleted: false
//     },
//     orderBy: {
//       [orderType as string]: sortType
//     },
//     select: {
//       id: true,
//       createdAt: true,
//       likes: true,
//       userId: true,
//       dislikes: true,
//       isDeleted: true,
//       message: true,
//       name: true,
//       user: {
//         select: {
//           name: true, 
//           role: true,
//         }
//       }
//     }
//   })
//   // console.log(comments)
//   return res.status(200).json({ result: "success", comments })
// }

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
  // const sortedComments = await prisma.smartphoneComments.findMany({
  //   orderBy: {
  //     createdAt: sortOrder
  //   }
  // })

  // return res.status(200).json({ result: "success", sortedComments })
}


const addNewComment = async (req: Request, res: Response)=> {
  const newComment = req.body
  const user = req.user as User
  await prisma.smartphoneComments.create({
    data: {
      id: newComment.id,
      name: user.name!,
      userId: user.id,
      deviceId: newComment.deviceId,
      message: newComment.message
    }
  })
  res.status(200).json({ message: "Message saved to data successfully" })
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
  addNewComment,
  // getViewMoreSmartphoneComments,
}