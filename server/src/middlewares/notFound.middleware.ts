import type { Request, Response, NextFunction } from "express"

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route Not Found" });
}

export default notFound