import type { Request, Response, NextFunction} from "express"

const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message)
  res.status(500).json({ message: "Something went wrong try again later" })
}

export default errorHandlerMiddleware